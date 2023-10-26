import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Company } from '../model/company.model';
import { CompanyRepo } from '../repository/company.repository';
import { CompanyDomain } from '../domain/company';
import { CompanyMap } from '../mappers/companyMap';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('CompanyRepo') private readonly companyRepo: CompanyRepo,
  ) {}

  async createCompany(
    name: string,
    address: string,
    industry: string,
    email: string,
    taxId: string,
    password: string,
  ) {
    const newCompanyorError = CompanyDomain.create({
      name,
      address,
      industry,
      email,
      taxId,
      password,
    });

    if (newCompanyorError.isFailure) {
      throw new BadRequestException(newCompanyorError.errorValue());
    }

    const newCompany = newCompanyorError.getValue();

    const data = CompanyMap.toPersistence(newCompany);

    return this.companyRepo.save(data);
  }

  async getAllCompanies(): Promise<any> {
    const companies = await this.companyRepo.findPaginated();
    console.log(companies);
    return companies;
  }

  async updateCompany(
    id: string,
    name: string,
    address: string,
    industry: string,
    email: string,
    taxId: string,
    password: string,
  ): Promise<Company | null> {
    const updatedCompany = await this.companyRepo.findOneAndUpdate(
      { id }, // Assuming you have an id field
      { name, address, industry, email, taxId, password },
    );
    return updatedCompany;
  }
}
