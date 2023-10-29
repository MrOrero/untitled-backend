import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  async register(@Body() companyData: any) {
    const { name, address, industry, email, taxId, password } = companyData;

    try {
      const createdCompany = await this.companyService.register(
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginData: any) {
    const { email, password } = loginData;

    try {
      const company = await this.companyService.login(email, password);
      return company;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllCompanies() {
    const companies = await this.companyService.getAllCompanies();
    return companies;
  }

  @Get(':id')
  async getCompanyById(@Param('id') companyId: string) {
    const company = await this.companyService.getCompanyById(companyId);

    if (!company) {
      throw new BadRequestException(`Company with ID ${companyId} not found`);
    }

    return company;
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
