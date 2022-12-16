import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity';
import { TagSchema } from './schema/tag.schema';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tag.name,
        useFactory: () => {
          TagSchema.pre('save', function (next) {
            // this.name = toKeyword(toSlug(this.slug));
            return next();
          });
          return TagSchema;
        },
      },
    ]),
  ],
  providers: [TagResolver, TagService],
  exports: [TagService],
})
export class TagModule {}
