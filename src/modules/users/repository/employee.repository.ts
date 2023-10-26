import { AbstractRepo } from 'src/libs/db/AbstractRepo';
import EmployeeModel, { Employee } from '../model/employee.model';

export class EmployeeRepo extends AbstractRepo<Employee> {
  constructor() {
    super(EmployeeModel.getModel());
  }
}
