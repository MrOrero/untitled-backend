import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Employee } from '../model/employee.model';
import { EmployeeRepo } from '../repository/employee.repository';
import { EmployeeDomain } from '../domain/employee';
import { EmployeeMap } from '../mappers/employeeMap';
import * as bcrypt from 'bcrypt';
import { createEmployeeToken } from 'src/libs/utils/createEmployeeToken';
import { UpdateEmployeeDto } from '../dto/UpdateEmployeeDto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EmployeeRepo') private readonly employeeRepo: EmployeeRepo,
  ) {}

  /**
   * Register a new employee.
   * @param companyId - The employee's company.
   * @param firstName - The employee's first name.
   * @param lastName - The employee's last name.
   * @param email - The employee's email address.
   * @param password - The employee's password.
   * @param address - The employee's address.
   * @param phoneNumber - The employee's phone number.
   * @param role - The employee's role.
   * @param department - The employee's department.
   * @returns {Promise<Employee>} - The registered employee.
   * @throws BadRequestException if email already exists or validation fails.
   */
  async create(
    companyIdFromToken: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string,
    role: string,
    department: string,
    jobTitle: string,
  ) {
    // Check if email already exists
    const emailExists = await this.employeeRepo.exists({ email });
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployeeorError = EmployeeDomain.create({
      companyId: companyIdFromToken,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      role,
      department,
      jobTitle,
      hasChangedPassword: false,
    });

    if (newEmployeeorError.isFailure) {
      throw new BadRequestException(newEmployeeorError.errorValue());
    }

    const newEmployee = newEmployeeorError.getValue();

    const data = EmployeeMap.toPersistence(newEmployee);

    return this.employeeRepo.save(data);
  }

  /**
   * Login an employee.
   * @param email - The employee's email address.
   * @param password - The employee's password.
   * @returns {Promise<{ token: string; company: Company } | null>} - An object containing a token and the employee, or null if login fails.
   * @throws BadRequestException if login credentials are invalid.
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; employee: Employee } | null> {
    const employee = await this.employeeRepo.findOne({ email });

    // Check if employee exists
    if (!employee) {
      throw new BadRequestException('Invalid email or password');
    }

    // Check if password is valid
    const passwordMatch = await this.comparePassword(
      password,
      employee.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = createEmployeeToken(employee.id, 'EMPLOYEE', employee.role);
    return { token, employee };
  }

  /**
   * Get all employees.
   * @returns {Promise<any>} - An array of employees.
   */
  async getAllEmployees(): Promise<any> {
    const employees = await this.employeeRepo.findPaginated();
    return employees;
  }

  /**
   * Get all employees by company.
   * @returns {Promise<any>} - An array of employees.
   * @param companyId - The company's id.
   * @throws BadRequestException if company id is not provided.
   * @returns {Promise<any>} - An array of employees.
   */
  async getEmployeesByCompany(companyId: string) {
    const employees = await this.employeeRepo.findByCompany(companyId);
    return employees;
  }

  /**
   * Get an employee by id.
   * @param employeeId - The employee's id.
   * @returns {Promise<Employee | null>} - The employee, or null if not found.
   */
  async getEmployeeById(employeeId: string): Promise<Employee | null> {
    const employee = await this.employeeRepo.findById(employeeId);
    return employee;
  }

  /**
   * Update an employee.
   * @param id - The employee's id.
   * @param dto - The employee's data.
   * @returns {Promise<Employee | null>} - The updated employee, or null if not found.
   */
  async updateEmployee(id: string, dto: UpdateEmployeeDto) {
    const updatedEmployee = await this.employeeRepo.findOneAndUpdate(
      { _id: id },
      dto,
    );
    return updatedEmployee;
  }
  /**
   * Delete an employee.
   * @param id - The employee's id.
   * @returns {Promise<{ success: boolean }>} - An object containing a success boolean.
   * @throws BadRequestException if employee id is not provided.
   * @throws BadRequestException if employee id is not found.
   */
  async deleteEmployee(id: string): Promise<{ success: boolean }> {
    const deletedEmployee = await this.employeeRepo.findOneAndDelete({
      _id: id,
    });
    if (deletedEmployee) {
      return { success: true };
    }
    return { success: false };
  }

  /**
   * Reset a employee's password.
   * @param employeeId - The employee ID.
   * @param oldPassword - The employee's old password.
   * @param newPassword - The employee's new password.
   * @returns {Promise<{ success: boolean }>} - An object containing a success boolean.
   */
  async resetPassword(
    employeeId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const employee = await this.employeeRepo.findById(employeeId);

    if (!employee) {
      throw new BadRequestException(`Employee with ID ${employeeId} not found`);
    }

    // Check if old password is valid
    const isOldPasswordValid = await this.comparePassword(
      oldPassword,
      employee.password,
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('Invalid old password');
    }

    // Hash and update the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    employee.password = hashedNewPassword;

    employee.hasChangedPassword = true;

    // Save the updated employee
    await this.employeeRepo.save(employee);

    return { success: true };
  }

  // Helper function to compare password
  private async comparePassword(
    enteredPassword: string,
    actualPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, actualPassword);
  }

  // Helper function to find employee by email
  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.employeeRepo.findOne({ email });
    return employee;
  }
}
