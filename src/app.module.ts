import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { TitleModule } from './modules/title/title.module';
import { DepartmentModule } from './modules/department/department.module';
import { Department } from './modules/department/entities/department.entity';
import { Title } from './modules/title/entities/title.entity';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guard/jwt.auth.guard';

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
      entities: [User, Department, Title],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TitleModule,
    DepartmentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
