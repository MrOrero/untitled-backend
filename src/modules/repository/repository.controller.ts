import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyAuthMiddleware } from '../users/middleware/company-auth.middleware';
import { RepositoryService } from './services/repository.service';

@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @UseGuards(CompanyAuthMiddleware) 
  @Post('/')
  @UseInterceptors(FileInterceptor('doc'))
  async addDocument(@UploadedFile() doc: Express.Multer.File, @Req() request) {
    const companyId = request.companyId;
    const res = await this.repositoryService.addDocument(doc, companyId);
    return res;
  }

  @UseGuards(CompanyAuthMiddleware)
  @Get('/')
  async getAllWorflowsinACompany(@Req() request) {
    const companyId = request.companyId;
    const res =
      await this.repositoryService.getAllDocuments(companyId);
    return res;
  }
}
