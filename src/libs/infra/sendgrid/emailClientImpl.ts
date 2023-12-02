// import * as SendGrid from '@sendgrid/mail';
// import { EmailClient } from './emailClient';
// import { Injectable } from '@nestjs/common';
// import { sendLogMessageToSlack } from 'src/libs/common/helpers/utils';
// import { CMS_LOGS_SLACK_CHANNEL } from 'src/libs/constants/constants';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class EmailClientImpl implements EmailClient {
//   constructor(private readonly configService: ConfigService) {
//     SendGrid.setApiKey(configService.get('SENDGRID_API_KEY'));    
//   }

//   async send(mail: SendGrid.MailDataRequired) {
//     try {
//       const transport = await SendGrid.send(mail);
//       return transport;
//     } catch (err) {
//       sendLogMessageToSlack(
//         CMS_LOGS_SLACK_CHANNEL,
//         JSON.stringify({
//           error: 'error sending email',
//           ...err,
//         }),
//       );
//       throw err;
//     }
//   }
// }
