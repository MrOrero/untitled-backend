import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  BadRequestException,
  UseGuards,
  HttpCode,
  Delete,
  Req,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CompanyAuthMiddleware } from '../middleware/company-auth.middleware';
import { UpdateEmployeeDto } from '../dto/UpdateEmployeeDto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(CompanyAuthMiddleware)
  @Post('create')
  async create(@Body() employeeData: any, @Req() request) {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      role,
      department,
      jobTitle,
    } = employeeData;

    const companyId = request.companyId;

    try {
      const createdEmployee = await this.employeeService.create(
        companyId,
        firstName,
        lastName,
        email,
        password,
        address,
        phoneNumber,
        role,
        department,
        jobTitle,
      );
      return createdEmployee;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginData: any) {
    const { email, password } = loginData;

    try {
      const employee = await this.employeeService.login(email, password);
      return employee;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(CompanyAuthMiddleware)
  @Get('all')
  async getAllEmployees(@Req() request) {
    const companyId = request.companyId;
    const employees =
      await this.employeeService.getEmployeesByCompany(companyId);
    if (!employees || employees.length === 0) {
      throw new BadRequestException('No employees found');
    }
    return employees;
  }

  @UseGuards(CompanyAuthMiddleware)
  @Get(':id')
  async getEmployeeById(@Param('id') employeeId: string) {
    const employee = await this.employeeService.getEmployeeById(employeeId);

    if (!employee) {
      throw new BadRequestException(`Employee with ID ${employeeId} not found`);
    }

    return employee;
  }

  @UseGuards(CompanyAuthMiddleware)
  @Put(':id')
  async updateEmployee(
    @Param('id') employeeId: string,
    @Body() employeeData: UpdateEmployeeDto,
  ) {
    const updatedEmployee = await this.employeeService.updateEmployee(
      employeeId,
      employeeData,
    );

    if (!updatedEmployee) {
      throw new BadRequestException(`Employee with ID ${employeeId} not found`);
    }

    return updatedEmployee;
  }

  @UseGuards(CompanyAuthMiddleware)
  @Delete(':id')
  async deleteEmployee(@Param('id') employeeId: string) {
    const deletedEmployee =
      await this.employeeService.deleteEmployee(employeeId);

    if (!deletedEmployee) {
      throw new BadRequestException(`Employee with ID ${employeeId} not found`);
    }

    return deletedEmployee;
  }
}
