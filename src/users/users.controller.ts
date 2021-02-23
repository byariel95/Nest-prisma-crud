import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindUserByName, UpdateUserDto } from './dtos';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  getAllUsers() : Promise<UserModel[]> 
  {
      return  this.usersService.getAllUsers();
  }

  @Get('find')
  getUserByName(@Body() filterUser: FindUserByName) : Promise<UserModel[]> 
  {
      return  this.usersService.getUsersByEmailOrName(filterUser);
  }

  @Get(':id')
   getOneUser(@Param('id',ParseIntPipe) id : number ): Promise<User> 
  {
      return  this.usersService.getOneUser(id);
  }

  @Post()
   createUser(@Body() createUserDto: CreateUserDto) : Promise<User> 
  {
      return  this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
   updateUser(@Param('id',ParseIntPipe) id : number ,@Body() updateUserDto: UpdateUserDto) : Promise<User> 
  {
      return  this.usersService.editUser(id, updateUserDto);
  }

  @Delete(':id')
   deleteUser(@Param('id',ParseIntPipe) id :number): Promise<{message: string, user:User}> 
  {
      return this.usersService.deleteUser(id);
  }
}
