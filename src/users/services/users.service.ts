import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UpdateUserDto ,CreateUserDto ,FindUserByName} from '../dtos';
import { UserModel } from '../models/user.model';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async getAllUsers(): Promise<UserModel[]> 
    {
      return  await this.prisma.user.findMany({
        where: {
          state: true
        },
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          state: true,
          gender: true,
          role: true,
          createdAt: true,
          companyId: true
        }
      })
    }

    async getOneUser(id:number) : Promise<User>{
        
      const user = await this.prisma.user.findUnique({
        where:{
          id,
        }
      })
      
      if(!user){
          throw new NotFoundException('User does not exist');
      }
      delete user.password
      return user;
  }

  async getUsersByEmailOrName(findUserBynameOrlastname:FindUserByName) : Promise<UserModel[]>{
        
    const { name, lastname } = findUserBynameOrlastname
       const users = await this.prisma.user.findMany({
        where: {
          OR: [
            {
              name:{
                contains: name
              }
            },
            {
              lastName:{
                contains: lastname
              }
            },
          ]
        },
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          state: true,
          gender: true,
          role: true,
          createdAt: true,
          companyId: true
        }
      });
      return users;   
}

    async createUser(createUserDto: CreateUserDto): Promise<User> 
    {
        const { password } = createUserDto;
         createUserDto.password = await this.hashPassword(password);
        try {
          const user =  await this.prisma.user.create({
            data: createUserDto
          });
          delete  user.password;
          return user
        } catch (error) {
          if (error.code === 'P2002')
          {
            throw new ConflictException('Email already exist');
          }
          else
          {
            console.log(error.code);
            throw new InternalServerErrorException('internal server, please contact your admin');
          }
          
        }
        
    }

    async editUser(id: number, updateUserDto: UpdateUserDto ): Promise<User>
    {
         await this.getOneUser(id);
        const { password } = updateUserDto;
        updateUserDto.password = await this.hashPassword(password);
        const userEdited =  await this.prisma.user.update({
          data: updateUserDto,
          where: {id}
        });
        delete userEdited.password;
        return userEdited;
    }

    async deleteUser(id: number): Promise<{message: string, user:User}>{
   
      await this.getOneUser(id);
      const user = await this.prisma.user.delete({
        where: {
          id,
        }
      });
      delete user.password;
      return {message: "success user deleted",user}
    
}

    async hashPassword(password: string): Promise<string> 
    {
        const salt = await genSalt(10)
        password = await hash(password, salt);
        return password;
    }
}
