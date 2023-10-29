import { Injectable } from '@nestjs/common';
import { CompanyService } from '../users/services/company.service';
import { EmployeeService } from '../users/services/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly employeeService: EmployeeService,
  ) {}

  async validateUser(email: string, password: string) {
    const company = await this.companyService.findByEmail(email);
    if (company && company.password === password) {
      return company;
    }

    const employee = await this.employeeService.findByEmail(email);
    if (employee && employee.password === password) {
      return employee;
    }

    return null;
  }
}
