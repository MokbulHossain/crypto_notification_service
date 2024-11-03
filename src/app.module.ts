import { Module, NestModule,MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {LoggerMiddleware} from './middleware'

import {interceptorProviders} from './helpers/interceptor'

import { EmailSendModule } from './modules/email-send/email-send.module';

/*
  For kafka producer configure here inside appmodule.ts..
  For kafka consumer configure inside main.ts
*/

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    EmailSendModule
  ],
  controllers: [

  ],
  providers: [

     ...interceptorProviders
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

