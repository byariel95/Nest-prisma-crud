import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports:[SharedModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
