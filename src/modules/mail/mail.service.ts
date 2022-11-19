import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entities';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
@Injectable()
export class MailService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });
  }
  async sendMail(
    email: string,
    subject: string,
    html: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this.transporter().sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: subject,
      html: html,
    });
  }

  async generateToken(email: string): Promise<string> {
    const token = await this.jwtService.sign(
      { email },
      {
        secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
        expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRATION_TIME),
      },
    );
    return token;
  }

  async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException("Can't decode this token");
    } catch (error) {
      throw error;
    }
  }

  async confirmEmail(token: string): Promise<boolean> {
    const email = await this.decodeConfirmationToken(token);
    const user = await this.userService.getOne({ email });
    if (!user) {
      throw new UnauthorizedException("This token can't use with email");
    }
    if (user.isConfirmMail) {
      throw new BadRequestException('Email is confirmed');
    }
    await this.userService.findOneAndUpdate(
      { email },
      { $set: { isConfirmMail: true } },
    );
    return true;
  }
}
