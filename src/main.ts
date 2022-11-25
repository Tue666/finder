import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './modules/logger/logger.service';
import fs from 'fs';
import { configure as serverlessExpress } from '@vendia/serverless-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const dir = '../../tmp';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  app.set('trust proxy', process.env.NODE_ENV !== 'production');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ limit: '1mb', extended: true }));
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  // app.useGlobalFilters(new GraphQLExceptionFilter());
  app.use(
    graphqlUploadExpress({
      maxFiles: 100,
      maxFileSize: 10000000, // 10 MB,
    }),
  );
  app.useLogger(new LoggerService());
  return app;
}
export const bootstrapServerless = async () => {
  const app = await bootstrap();
  const globalPrefix = '.netlify/functions/main';
  app.setGlobalPrefix(globalPrefix);

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
};

async function startServer() {
  const app = await bootstrap();
  await app.listen(2000);
}

startServer();
