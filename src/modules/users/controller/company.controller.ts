import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { AuthMiddleware } from '../middleware/auth.middleware';

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

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginData: any) {
    const { email, password } = loginData;
    try {
      const result = await this.companyService.login(email, password);
      if (!result) {
        throw new BadRequestException('Invalid email or password');
      }
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthMiddleware)
  @Get('all')
  async getAllCompanies() {
    const companies = await this.companyService.getAllCompanies();
    return companies;
  }

  @UseGuards(AuthMiddleware)
  @Get(':id')
  async getCompanyById(@Param('id') companyId: string) {
    const company = await this.companyService.getCompanyById(companyId);

    if (!company) {
      throw new BadRequestException(`Company with ID ${companyId} not found`);
    }

    return company;
  }
}
