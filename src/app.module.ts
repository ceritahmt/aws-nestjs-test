import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { TitleModule } from './modules/title/title.module';
import { DepartmentModule } from './modules/department/department.module';
import { Department } from './modules/department/entities/department.entity';
import { Title } from './modules/title/entities/title.entity';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guard/jwt.auth.guard';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CustomTypeOrmModule } from './common/test/custom.typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomTypeOrmModule([User, Department, Title]),
    UserModule,
    TitleModule,
    DepartmentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
