import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() employeeData: any) {
    const {
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      role,
      department,
    } = employeeData;

    try {
      const createdEmployee = await this.employeeService.createEmployee(
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        role,
        department,
      );
      return createdEmployee;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllEmployees() {
    const employees = await this.employeeService.getAllEmployees();
    return employees;
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') employeeId: string,
    @Body() employeeData: any,
  ) {
    const {
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      role,
      department,
    } = employeeData;

    const updatedEmployee = await this.employeeService.updateEmployee(
      employeeId,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      role,
      department,
    );

    if (!updatedEmployee) {
      throw new BadRequestException(`Employee with ID ${employeeId} not found`);
    }

    return updatedEmployee;
  }
}
