import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Employee } from '../model/employee.model';
import { EmployeeRepo } from '../repository/employee.repository';
import { EmployeeDomain } from '../domain/employee';
import { EmployeeMap } from '../mappers/employeeMap';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { UpdateEmployeeDto } from '../dto/UpdateEmployeeDto';
import { OnboardingWorkflowService } from 'src/modules/onboarding-workflow/services/onboarding-workflow.service';
//import { createToken } from 'src/libs/utils/createToken';
@Injectable()
export class EmployeeService {

  @Inject()
  private readonly onboardingWorkflowService: OnboardingWorkflowService;

  constructor(
    @Inject('EmployeeRepo') private readonly employeeRepo: EmployeeRepo,
  ) {}

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
    const emailExists = await this.employeeRepo.exists({ email });
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

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

  private async comparePassword(
    enteredPassword: string,
    actualPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, actualPassword);
  }

  async getAllEmployees(): Promise<any> {
    const employees = await this.employeeRepo.findPaginated();
    return employees;
  }

  async getEmployeeById(employeeId: string): Promise<Employee | null> {
    const employee = await this.employeeRepo.findById(employeeId);
    return employee;
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.employeeRepo.findOne({ email });
    return employee;
  }

  async updateEmployee(
    id: string,
    dto: UpdateEmployeeDto,
  ) {
    if (dto.assignedWorkflow) {
      const workflowId =  await this.onboardingWorkflowService.assignWorkflowToEmployee(dto.assignedWorkflow, id)
      dto.assignedWorkflow = workflowId.toString();
    }

    const updatedEmployee = await this.employeeRepo.findOneAndUpdate(
      { _id: id }, 
      dto,
    );
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<{ success: boolean }> {
    const deleteResult = await this.employeeRepo.findOneAndDelete({ id });
    return { success: deleteResult.status };
  }
}
