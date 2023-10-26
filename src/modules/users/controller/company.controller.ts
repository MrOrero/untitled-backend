import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() companyData: any) {
    const { name, address, industry, email, taxId, password } = companyData;

    try {
      const createdCompany = await this.companyService.createCompany(
        name,
        address,
        industry,
        email,
        taxId,
        password,
      );
      return createdCompany;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllCompanies() {
    const companies = await this.companyService.getAllCompanies();
    return companies;
  }

  @Put(':id')
  async updateCompany(
    @Param('id') companyId: string,
    @Body() companyData: any,
  ) {
    const { name, address, industry, email, taxId, password } = companyData;

    const updatedCompany = await this.companyService.updateCompany(
      companyId,
      name,
      address,
      industry,
      email,
      taxId,
      password,
    );

    if (!updatedCompany) {
      throw new BadRequestException(`Company with ID ${companyId} not found`);
    }

    return updatedCompany;
  }
}
