import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Employee } from '../model/employee.model';
import { EmployeeRepo } from '../repository/employee.repository';
import { EmployeeDomain } from '../domain/employee';
import { EmployeeMap } from '../mappers/employeeMap';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EmployeeRepo') private readonly employeeRepo: EmployeeRepo,
  ) {}

  async createEmployee(
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phoneNumber: string,
    role: string,
    department: string,
  ) {
    const newEmployeeorError = EmployeeDomain.create({
      firstName,
      lastName,
      email,
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

  async getAllEmployees(): Promise<any> {
    const employees = await this.employeeRepo.findPaginated();
    console.log(employees);
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
      { id }, // Assuming you have an id field
      { firstName, lastName, email, address, phoneNumber, role, department },
    );
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<{ success: boolean }> {
    const deleteResult = await this.employeeRepo.findOneAndDelete({ id });
    return { success: deleteResult.status };
  }
}
