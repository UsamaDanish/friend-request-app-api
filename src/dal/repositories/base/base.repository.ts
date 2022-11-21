import { AnyObject } from 'mongoose';

import { Collection } from '@/dal/repositories/base/base.model';

export abstract class BaseRepository {
  model: any;
  repoName: string;

  constructor(model: any, repoName: string) {
    this.model = model;
    this.repoName = repoName;
  }

  /**
   * Helper function to save object in DB
   * @param {Object} [object] - Object to save
   * @returns {Promise<unknown>}
   */
  save(object: any) {
    return new Promise<any>((resolve, reject) => {
      object
        .save()
        .then((data: any) => {
          if (data) {
            data = data.toObject();
            delete data.__v;
            delete data.isDeleted;
          }
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * Helper method to findOne in DB
   * @param {Object} [queryObj] - query obj
   * @param {Array} [populateFields] - Foreign fields to populate
   * @param {Array} [selectFields] - Fields to return in the query
   * @param {string} [reqId] - request id
   * @returns {Promise<unknown>}
   */
  findOne(queryObj: any, populateFields: Collection[], selectFields: string[]) {
    return new Promise<any>((resolve, reject) => {
      this.model
        .findOne(queryObj)
        .select(selectFields)
        .populate(populateFields)
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * Helper function to find all
   * @param {Object} [queryObj] - query obj
   * @param {String} [sortField] - Field to sort on
   * @param {Number} [sortOrder] - Sort order
   * @param {Number} [recordsPerPage] - Number of records per page to fetch
   * @param {Number} [offset] - Offset of records
   * @param {Array} [populateFields] - Foreign fields to populate
   * @param {Array} [selectFields] - Fields to return in the query
   * @returns {Promise<unknown>}
   */
  findAll(
    queryObj: any,
    sortField: string,
    sortOrder: number,
    recordsPerPage: number,
    offset: number,
    populateFields: Collection[],
    selectFields: string[],
    collation = { locale: 'en' },
  ) {
    return new Promise<any>((resolve, reject) => {
      let queryResult = this.model
        .find(queryObj)
        .collation(collation)
        .skip(offset)
        .limit(recordsPerPage)
        .select(selectFields);

      if (sortField) {
        queryResult = queryResult.sort({ [sortField]: sortOrder });
      }

      queryResult = queryResult.populate(populateFields).lean();

      queryResult
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * Function to get count of docs
   * @param {Object} [queryObj] - Query Object
   * @returns {Promise<unknown>}
   */
  getCount(queryObj: any) {
    return new Promise<any>((resolve, reject) => {
      this.model
        .countDocuments(queryObj)
        .then((data: any) => {
          resolve({ totalRecords: data });
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * Helper function to find entity by props and update it
   * @param {Object} [updateQuery] - Query object
   * @param {Object} [updatedProps] - Props to update
   * @param {Object} [deleteProps] - Props to remove from doc
   * @returns {Promise<unknown>}
   */
  updateOne(
    updateQuery: AnyObject,
    updatedProps: AnyObject,
    deleteProps: AnyObject,
  ) {
    return new Promise<any>((resolve, reject) => {
      this.model
        .findOneAndUpdate(
          updateQuery,
          { $set: updatedProps, $unset: deleteProps } as any,
          { new: true },
        )
        .select(['-__v', '-isDeleted'])
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
