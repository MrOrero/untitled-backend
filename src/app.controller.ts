import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { giveCurrentDateTime } from './libs/common/helpers/utils';
import { uploadFile } from './libs/infra/firebase-storage/firebase-storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Post("/")
  @UseInterceptors(FileInterceptor("doc"))
  async uploadTemplate(
    @UploadedFile()
    doc: Express.Multer.File
  ) {
    try {
      const res = await uploadFile(doc);
      return res;
  } catch (error) {
  }
  }
}
