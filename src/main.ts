import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import * as session from 'express-session';

import { AppConstants } from '@/modules/shared/constants';
import { AppModule } from '@/app.module';
import { AuthConstants } from '@/modules/auth/constants';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(AppConstants.routesPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      secret: AuthConstants.secret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  // swagger should be setup after setting global perfix.
  initSwagger(app);

  await configureDB();

  await app.listen(3001, () =>
    console.log(
      'Server started on port 3001 at: http://localhost:3001/api/ping',
    ),
  );
}

async function initSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('Friend Request App API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${AppConstants.routesPrefix}/docs`, app, document);
}

async function configureDB() {
  mongoose.connection.on('connected', () => {
    console.log('Database connected successfully.');
  });

  mongoose.connection.on('error', (err) => {
    console.log(`Unable to connected to database: ${err && err.toString()}`);
  });

  mongoose.connection.on('disconnected', (err) => {
    console.log(`Database connected: ${err && err.toString()}`);
  });

  await mongoose.connect(process.env.MONGODBURI as string);
}

bootstrap();
