import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import UploadDocumentModel from './modules/steps-configuration/models/upload-document.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(3000);

  const uploadDocumentModel = UploadDocumentModel.getModel();

}
bootstrap();
