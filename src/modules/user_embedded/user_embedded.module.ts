import { Module } from '@nestjs/common';
import { UserEmbeddedService } from './user_embedded.service';
import { UserEmbeddedResolver } from './user_embedded.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEmbedded } from './entities/user_embedded.entity';
import { UserEmbeddedSchema } from './schema/user_embedded.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEmbedded.name,
        schema: UserEmbeddedSchema,
      },
    ]),
  ],
  providers: [UserEmbeddedResolver, UserEmbeddedService],
  exports: [UserEmbeddedService],
})
export class UserEmbeddedModule {}
