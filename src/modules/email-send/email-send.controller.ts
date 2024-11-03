import { Controller, Post, Request, Body } from '@nestjs/common';
import { EmailSendService } from './email-send.service'
@Controller('email-send')
export class EmailSendController {

    constructor (
        private readonly emailSendService: EmailSendService
    ) {}

    @Post('/')
    async emailSend(@Request() req, @Body() reqbody: any) {
  
      return await this.emailSendService.triggerEmail({ 
            SenderEmail: reqbody['email'], 
            Message: reqbody['body'],
            Subject: reqbody['subject'] || "Send OTP",
       })
  
    }
}
