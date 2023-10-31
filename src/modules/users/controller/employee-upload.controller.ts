import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeUploadService } from '../services/employee-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee-upload')
export class EmployeeUploadController {
  constructor(private readonly employeeUploadService: EmployeeUploadService) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCSV(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const result =
      await this.employeeUploadService.uploadEmployeesFromCSV(file);
    return {
      message: 'Employees uploaded successfully.',
      summary: result,
    };
  }
}
