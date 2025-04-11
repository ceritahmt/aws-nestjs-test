import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { TitleModule } from './modules/title/title.module';
import { DepartmentModule } from './modules/department/department.module';
import { Department } from './modules/department/entities/department.entity';
import { Title } from './modules/title/entities/title.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST!,
      port: +process.env.POSTGRES_PORT!, 
      username: process.env.POSTGRES_USERNAME!,
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DATABASE!,
      entities: [User,Department,Title],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TitleModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
