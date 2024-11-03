import { Injectable, OnModuleInit  } from '@nestjs/common'
import { winstonLog } from '../../config/winstonLog'
import nodemailer from 'nodemailer'
import { decrypt } from '@utils/cipher';

const EMAIL_HOST = process.env.IS_CRD_PLAIN == 'true' ? process.env.EMAIL_HOST : decrypt(process.env.EMAIL_HOST)
const EMAIL_PORT = process.env.IS_CRD_PLAIN == 'true' ? process.env.EMAIL_PORT : decrypt(process.env.EMAIL_PORT)
const EMAIL_USERNAME = process.env.IS_CRD_PLAIN == 'true' ? process.env.EMAIL_USERNAME : decrypt(process.env.EMAIL_USERNAME)
const EMAIL_PASSWORD = process.env.IS_CRD_PLAIN == 'true' ? process.env.EMAIL_PASSWORD : decrypt(process.env.EMAIL_PASSWORD)
const EMAIL = process.env.IS_CRD_PLAIN == 'true' ? process.env.EMAIL : decrypt(process.env.EMAIL)

@Injectable()
export class EmailSendService {

  private transporter

    constructor( ) {

          this.transporter = nodemailer.createTransport({
           host: EMAIL_HOST,
          //  service: 'gmail',
            port: parseInt(EMAIL_PORT),
            secure: process.env.EMAIL_SECURE == 'true' ? true : false, // true for 465, false for other ports
            auth: {
              user: EMAIL_USERNAME, // generated ethereal user
              pass: EMAIL_PASSWORD, // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false
              }
          })

    }
      
    async triggerEmail({ NotificationId=null, SenderEmail=null, Message=null, Subject=null,Attachments=[]}) {

      this.sendEmail({NotificationId, SenderEmail, Message, Subject,Attachments})
      return true
    }

    async sendEmail({NotificationId=null, SenderEmail=null, Message=null, Subject=null,Attachments=[]}) {

      if(!SenderEmail || !Message) {
        winstonLog.log('info', 'SenderEmail or Message body is empty', { label: 'Email-send' })
        return 0
      }

      let mailOptions = {
        from: EMAIL,
        to: SenderEmail, // list of receivers ...for multiple recever to:["mokbul15-469@diu.edu.bd","mokbul15-469@diu.edu.bd"]
        subject: Subject, // Subject line
        //text: text, // plain text body
        html: Message // html body
      }
      //send file...
      if(Attachments && Attachments.length){
        const attachments = Attachments.map(item => {
          return {
            path: item
          }
        })
        mailOptions['attachments'] =attachments
      }

      this.transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          winstonLog.log('error', '%o', error, { label: 'Nodemailer-send-email' })
        } 
        else {
          winstonLog.log('info', 'Email successfully sent! ID : %s', info.messageId||null, { label: 'Nodemailer-send-email' })
          //Email successfully sent! ID : <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        }

      })
    }

}
