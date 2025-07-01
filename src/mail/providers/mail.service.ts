import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../users/user.entity';
import { ConfigType } from '@nestjs/config';
import appConfig from '../../config/app.config';

@Injectable()
export class MailService {
  constructor(
    /**
     * Inject Mailer service
     */
    private readonly mailerService: MailerService,
    /**
     * Inject config service
     */
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  async sendUserWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Onboarding Team <${this.appConfiguration.mailHost}>`,
      subject: 'Welcome to NestJS Blog',
      template: './welcome', // Name of the template file without extension
      context: {
        name: user.firstName + ' ' + user.lastName, // Data to be passed to the template
        email: user.email, // Additional data if needed
        loginUrl: 'http://localhost:3000/login', // Example URL, replace with actual login URL
      },
    });
  }
}
