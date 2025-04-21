import { TypeOrmModule } from '@nestjs/typeorm';

export const CustomTypeOrmModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: +process.env.POSTGRES_PORT!,
    username: process.env.POSTGRES_USERNAME || 'nest',
    password: process.env.POSTGRES_PASSWORD || 'nest',
    database: process.env.POSTGRES_DATABASE || 'test',
    entities: [...entities],
    synchronize: true,
    logging: true,
  });
