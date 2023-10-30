// import {
//   BadRequestException,
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { EmployeeUploadService } from '../services/employee-upload.service';
// import * as multer from 'multer';

// // Create a multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Set the destination directory where uploaded files will be stored
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // Set the file name for the uploaded file
//     cb(null, file.originalname);
//   },
// });

// // Create a multer instance with the storage configuration
// const upload = multer({ storage });
// @Controller('employee-upload')
// export class EmployeeUploadController {
//   constructor(private readonly employeeUploadService: EmployeeUploadService) {}

//   @Post('csv')
//   @UseInterceptors(upload.single('file'))
//   async uploadCSV(@UploadedFile() file) {
//     if (!file) {
//       throw new BadRequestException('No file uploaded.');
//     }

//     // Get the file path
//     const filePath = file.path;

//     // Upload the employees from the CSV file
//     await this.employeeUploadService.uploadEmployeesFromCSV(filePath);

//     return {
//       message: 'Employees uploaded successfully.',
//     };
//   }
// }
