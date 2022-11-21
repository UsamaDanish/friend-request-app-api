import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { AppConstants } from '@/modules/shared/constants';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre('save', function callback(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.password) {
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    return bcrypt.genSalt(AppConstants.roundsForHashSalt, (err, salt) => {
      if (err) return next(err);

      // hash the password using our new salt
      return bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);

        // override the cleartext password with the hashed one
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

/**
 * Compares the provided password with the stored hash in the DB
 * @param {String} candidatePassword The provided password of the user which is to be checked.
 * @param {Function} cb The callback function which is to be called after the process.
 */
// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: any,
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

export const UserObject = mongoose.model('User', UserSchema);
