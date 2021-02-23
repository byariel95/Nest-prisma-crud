import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Company} from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateCompanyDto , UpdateCompanyDto } from '../dtos/';

@Injectable()
export class CompaniesService 
{
    constructor(private prisma: PrismaService){}

    async getCompanies(): Promise<Company[]>
    {
      return await this.prisma.company.findMany({
        where: {
          state: true
        }
      });
    }

    async getCompany(id:number): Promise<Company>
    {
      const company = await this.prisma.company.findUnique({
        where:{
          id,
        }
      });
      if(!company){
        throw new NotFoundException(`company with  id ${id} not found`);
      }
      return company; 
    }
    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> 
    {
        return  await this.prisma.company.create({
          data: createCompanyDto
        });
    }

    async editCompany(id: number, updateCompany: UpdateCompanyDto ): Promise<Company>
    {
        await this.getCompany(id);
        return await this.prisma.company.update({
          data: updateCompany,
          where: {
            id,
          }
        });    
    }


    async deleteCompany(id: number): Promise<{message: string, company:Company}>{
   
        await this.getCompany(id);
        const company = await this.prisma.company.delete({
          where: {
            id,
          }
        });
        return {message: "success company deleted",company}
      
  }
}
