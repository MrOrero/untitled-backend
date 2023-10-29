import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async register(@Body() employeeData: any) {
    const {
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginData: any) {
    const { email, password } = loginData;

    try {
      const employee = await this.employeeService.login(email, password);
      return employee;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllEmployees() {
    const employees = await this.employeeService.getAllEmployees();
    return employees;
  }

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
