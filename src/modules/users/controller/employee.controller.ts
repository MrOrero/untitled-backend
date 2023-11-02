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
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
//import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
//import { AuthMiddleware } from '../middleware/auth.middleware';
import { CompanyAuthMiddleware } from '../middleware/company-auth.middleware';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(CompanyAuthMiddleware)
  @Post('create')
  async register(@Body() employeeData: any) {
    const {
      company,
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      role,
      department,
    } = employeeData;

    try {
      const createdEmployee = await this.employeeService.register(
        company,
        firstName,
        lastName,
        email,
        password,
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
  async getAllEmployees() {
    const employees = await this.employeeService.getAllEmployees();
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
