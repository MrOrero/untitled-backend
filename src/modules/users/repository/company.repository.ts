import { AbstractRepo } from 'src/libs/db/AbstractRepo';
import CompanyModel, { Company } from '../model/company.model';

export class CompanyRepo extends AbstractRepo<Company> {
  constructor() {
    super(CompanyModel.getModel());
  }
}
