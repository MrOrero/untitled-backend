import { EmployeeDomain } from '../domain/employee';
import { Employee } from '../model/employee.model';

export class EmployeeMap {
  public static toPersistence(employee: EmployeeDomain): Employee {
    return {
      companyId: employee.companyId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      password: employee.password,
      address: employee.address,
      phoneNumber: employee.phoneNumber,
      role: employee.role,
      department: employee.department,
      jobTitle: employee.jobTitle,
    };
  }
}
