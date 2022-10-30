import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from '../../constants/constants';
import { toKeyword, toSlug } from '../../utils/string.utils';
import { User } from './entities/user.entities';
import { UserSchema } from './schema/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre('save', function (next) {
            this.slug = toSlug(this.username, Constants.LOCALE_COUNTRY_CODE_VN);
            this.keyword = toKeyword(this.slug);
            this.slug += '-' + new Date().getTime().toString();
            return next();
          });
          return UserSchema;
        },
      },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
