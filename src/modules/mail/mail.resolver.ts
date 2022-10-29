import { Args, Query, Resolver } from '@nestjs/graphql';
import { MailService } from './mail.service';

@Resolver()
export class MailResolver {
  constructor(private mailService: MailService) {}
  @Query(() => Boolean)
  confirmMail(@Args('token') token: string): Promise<boolean> {
    try {
      return this.mailService.confirmEmail(token);
    } catch (error) {
      throw error;
    }
  }
}
