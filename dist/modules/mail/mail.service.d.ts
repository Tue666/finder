import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class MailService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    sendMail(email: string, subject: string, html: string): Promise<SMTPTransport.SentMessageInfo>;
    generateToken(email: string): Promise<string>;
    decodeConfirmationToken(token: string): Promise<string>;
    confirmEmail(token: string): Promise<boolean>;
}
