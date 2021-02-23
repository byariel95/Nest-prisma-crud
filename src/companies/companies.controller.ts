import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Company } from '@prisma/client';
import { CompaniesService } from './services/companies.service';
import { CreateCompanyDto ,UpdateCompanyDto} from './dtos/';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getCompanies() : Promise<Company[]> 
  {
      return this.companiesService.getCompanies();
  }
  
  @Get(':id')
  getOneCompany(@Param('id',ParseIntPipe) id : number) : Promise<Company> 
  {
      return this.companiesService.getCompany(id);
  }

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto) : Promise<Company> 
  {
      return  this.companiesService.createCompany(createCompanyDto);
  }

  @Patch(':id')
  updateCompany(@Param('id',ParseIntPipe) id : number, @Body() updateCompanyDto: UpdateCompanyDto) : Promise<Company> 
  {
      return this.companiesService.editCompany(id,updateCompanyDto);
  }
  
  @Delete(':id')
  deleteCompany(@Param('id',ParseIntPipe) id : number,) : Promise<{message:string,company:Company}> 
  {
      return this.companiesService.deleteCompany(id);
  }
}
