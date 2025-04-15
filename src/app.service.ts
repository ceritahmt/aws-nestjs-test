import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('App service started!');
    console.log('All environment variables:');
    console.log('------------------------');
    Object.keys(process.env).forEach((key) => {
      console.log(`${key}: ${process.env[key]}`);
    });
    console.log('------------------------');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
