import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Company } from '../model/company.model';
import { CompanyRepo } from '../repository/company.repository';
import { CompanyDomain } from '../domain/company';
import { CompanyMap } from '../mappers/companyMap';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
//import { createToken } from 'src/libs/utils/createToken';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('CompanyRepo') private readonly companyRepo: CompanyRepo,
  ) {}

  async register(
    name: string,
    address: string,
    industry: string,
    email: string,
    taxId: string,
    password: string,
  ) {
    const emailExists = await this.companyRepo.exists({ email });
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompanyorError = CompanyDomain.create({
      name,
      address,
      industry,
      email,
      taxId,
      password: hashedPassword,
    });

    if (newCompanyorError.isFailure) {
      throw new BadRequestException(newCompanyorError.errorValue());
    }

    const newCompany = newCompanyorError.getValue();

    const data = CompanyMap.toPersistence(newCompany);

    return this.companyRepo.save(data);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; company: Company } | null> {
    const company = await this.findByEmail(email);
    if (!company) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordValid = await this.comparePassword(
      password,
      company.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = jwt.sign({ sub: company._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token, company };
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.companyRepo.findCompanyByEmail(email);
    return company;
  }

  private async comparePassword(
    enteredPassword: string,
    actualPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, actualPassword);
  }

  async getAllCompanies(): Promise<any> {
    const companies = await this.companyRepo.findPaginated();
    return companies;
  }

  async getCompanyById(id: string): Promise<Company | null> {
    const company = await this.companyRepo.findById(id);
    return company;
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
      { id },
      { name, address, industry, email, taxId, password },
    );
    return updatedCompany;
  }
}
