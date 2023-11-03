import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Company } from '../model/company.model';
import { CompanyRepo } from '../repository/company.repository';
import { CompanyDomain } from '../domain/company';
import { CompanyMap } from '../mappers/companyMap';
import * as bcrypt from 'bcrypt';
import { createToken } from 'src/libs/utils/createToken';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('CompanyRepo') private readonly companyRepo: CompanyRepo,
  ) {}

  /**
   * Register a new company.
   * @param name - The company name.
   * @param address - The company address.
   * @param industry - The industry the company belongs to.
   * @param email - The company's email address.
   * @param taxId - The company's tax ID.
   * @param password - The company's password.
   * @param type - The company's type.
   * @returns {Promise<Company>} - The registered company.
   * @throws BadRequestException if email already exists or validation fails.
   */
  async register(
    name: string,
    address: string,
    industry: string,
    email: string,
    taxId: string,
    password: string,
  ) {
    // Check if email already exists
    const emailExists = await this.companyRepo.exists({ email });
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
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

  /**
   * Login a company.
   * @param email - The company's email address.
   * @param password - The company's password.
   * @returns {Promise<{ token: string; company: Company } | null>} - An object containing a token and the company, or null if login fails.
   * @throws BadRequestException if login credentials are invalid.
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; company: Company } | null> {
    const company = await this.companyRepo.findOne({ email });

    // Check if company exists
    if (!company) {
      throw new BadRequestException('Invalid credentials');
    }

    // Check if password is valid
    const passwordMatch = await this.comparePassword(
      password,
      company.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = createToken(company.id, 'COMPANY');
    return { token, company };
  }

  /**
   * Get all companies.
   * @returns {Promise<any>} - An array of companies.
   */
  async getAllCompanies(): Promise<any> {
    const companies = await this.companyRepo.findPaginated();
    return companies;
  }

  /**
   * Get a company by ID.
   * @param id - The company ID.
   * @returns {Promise<Company | null>} - The company, or null if not found.
   */
  async getCompanyById(id: string): Promise<Company | null> {
    const company = await this.companyRepo.findById(id);
    return company;
  }

  /**
   * Update a company.
   * @param id - The company ID.
   * @param dto - The company's data.
   * @returns {Promise<Company | null>} - The updated company, or null if not found.
   */
  async updateCompany(
    id: string,
    dto: UpdateCompanyDto,
  ): Promise<Company | null> {
    const updatedCompany = await this.companyRepo.findOneAndUpdate({ id }, dto);
    return updatedCompany;
  }

  // Function to find company by email
  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.companyRepo.findOne({ email });
    return company;
  }

  // Function to compare password
  private async comparePassword(
    enteredPassword: string,
    actualPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, actualPassword);
  }
}
