import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TitleModule } from '../title/title.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TitleModule, DepartmentModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
