import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, SharedModule, CompaniesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
