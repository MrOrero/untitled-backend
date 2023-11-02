import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Employee } from '../model/employee.model';
import { EmployeeRepo } from '../repository/employee.repository';
import { EmployeeDomain } from '../domain/employee';
import { EmployeeMap } from '../mappers/employeeMap';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
//import { createToken } from 'src/libs/utils/createToken';
@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EmployeeRepo') private readonly employeeRepo: EmployeeRepo,
  ) {}

  /**
   * Register a new employee.
   * @param company - The employee's company.
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
   * */
  async register(
    company: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string,
    role: string,
    department: string,
  ) {
    // Check if email already exists
    const emailExists = await this.employeeRepo.exists({ email });
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployeeorError = EmployeeDomain.create({
      company,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      role,
      department,
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
   * @returns {Promise<{ token: string; employee: Employee } | null>} - An object containing a token and the employee, or null if login fails.
   * @throws BadRequestException if login credentials are invalid.
   * */
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; employee: Employee } | null> {
    const employee = await this.employeeRepo.findOne({ email });
    if (!employee) {
      throw new BadRequestException('Invalid email or password');
    }

    const passwordMatch = await this.comparePassword(
      password,
      employee.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = jwt.sign(
      { sub: new ObjectId().toHexString() },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    return { token, employee };
  }

  async getAllEmployees(): Promise<any> {
    const employees = await this.employeeRepo.findPaginated();
    return employees;
  }
  /**
   * Get an employee by ID.
   * @param employeeId - The employee's ID.
   * @returns {Promise<Employee | null>} - The employee, or null if not found.
   * */
  async getEmployeeById(employeeId: string): Promise<Employee | null> {
    const employee = await this.employeeRepo.findById(employeeId);
    return employee;
  }

  async getEmployeesByCompany(company: string): Promise<any> {
    const employees = await this.employeeRepo.find({ company: company });
    console.log(company);
    return employees;
  }

  async updateEmployee(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phoneNumber: string,
    role: string,
    department: string,
  ): Promise<Employee | null> {
    const updatedEmployee = await this.employeeRepo.findOneAndUpdate(
      { id },
      { firstName, lastName, email, address, phoneNumber, role, department },
    );
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<{ success: boolean }> {
    const deleteResult = await this.employeeRepo.findOneAndDelete({ id });
    return { success: deleteResult.status };
  }

  // Function to find employee by email
  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.employeeRepo.findOne({ email });
    return employee;
  }

  // Function to compare password
  private async comparePassword(
    enteredPassword: string,
    actualPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, actualPassword);
  }
}
