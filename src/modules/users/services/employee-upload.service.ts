import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeUploadService {
  constructor(private readonly employeeService: EmployeeService) {}

  async uploadEmployeesFromCSV(filePath: string) {
    try {
      const employees = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // Process and validate data from CSV row
          // Example: Validate required fields and data types
          if (!row.firstName || !row.lastName || !row.email) {
            throw new BadRequestException(
              'CSV data is missing required fields.',
            );
          }

          employees.push(row);
        })
        .on('end', async () => {
          // Process the validated data and save to the database
          for (const employeeData of employees) {
            await this.employeeService.create(
              employeeData.companyID,
              employeeData.firstName,
              employeeData.lastName,
              employeeData.email,
              employeeData.password,
              employeeData.address,
              employeeData.phoneNumber,
              employeeData.role,
              employeeData.department,
            );
          }
        });
    } catch (error) {
      throw new BadRequestException('Error processing the CSV file.');
    }
  }
}
