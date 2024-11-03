import { Module } from '@nestjs/common';
import { EmailSendService } from './email-send.service';
import { EmailSendController } from './email-send.controller';

@Module({
  imports: [],
  providers: [EmailSendService],
  controllers: [EmailSendController]
})
export class EmailSendModule {}
 