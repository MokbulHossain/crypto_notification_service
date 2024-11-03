import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import {nestwinstonLog, HttpPortLog} from './config/winstonLog'
import {expressBind} from 'i18n-2'
import {localize} from './middleware'
/*
  For kafka consumer configure here inside main.ts..
  For kafka producer configure inside appmodule.ts
*/

async function bootstrap() {


  const NestFactoryOptions = {logger:  nestwinstonLog}

  const app = await NestFactory.create<NestExpressApplication>(AppModule,NestFactoryOptions)

   // global prefix
   app.setGlobalPrefix('cnotification')

   expressBind(app, {locales: [ 'en', 'bn' ] })
 
   app.use(localize)

  await app.listen(process.env.PORT || 3000, () => HttpPortLog(process.env.PORT || 3000));

}

bootstrap();
