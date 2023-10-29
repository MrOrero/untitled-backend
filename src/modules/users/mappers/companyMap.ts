import { CompanyDomain } from '../domain/company';
import { Company } from '../model/company.model';

export class CompanyMap {
  public static toPersistence(company: CompanyDomain): Company {
    return {
      _id: company.id,
      name: company.name,
      address: company.address,
      industry: company.industry,
      email: company.email,
      taxId: company.taxId,
      password: company.password,
    };
  }
}
