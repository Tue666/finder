import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterBuilder } from '../../../utils/filter.query';
import { PaginationInput } from '../../common/dto/common.dto';
import { FilterGetAllUser } from '../dto/create-user.dto';
import { User } from '../entities/user.entities';
import { UserModelType } from '../schema/user.schema';

@Injectable()
export class UserHelper {
  constructor(@InjectModel(User.name) private userModel: UserModelType) {}

  buildQuery(filter: FilterGetAllUser): any {
    const [isApplyAge, isApplyDistance] = [
      filter?.mySetting?.discovery?.onlyShowAgeThisRange,
      filter?.mySetting?.discovery?.onlyShowDistanceThisRange,
    ];

    const queryFilter: FilterBuilder<User> =
      new FilterBuilder<User>().setFilterItem(
        'matched',
        { $in: filter?.matched },
        filter?.matched,
      );

    if (isApplyAge) {
      queryFilter.setFilterItem(
        'mySetting.discovery.minAge',
        {
          $gte: filter?.mySetting?.discovery?.minAge,
        },
        filter?.mySetting?.discovery?.minAge,
      );
      queryFilter.setFilterItem(
        'mySetting.discovery.maxAge',
        {
          $lte: filter?.mySetting?.discovery?.maxAge,
        },
        filter?.mySetting?.discovery?.maxAge,
      );
    }
    if (isApplyDistance) {
      if (filter?.geoLocation) {
        queryFilter.setFilterItem(
          'geoLocation',
          {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [
                  filter?.geoLocation?.coordinates[0],
                  filter?.geoLocation?.coordinates[1],
                ],
              },
              $minDistance: 0,
              $maxDistance: filter?.mySetting?.discovery?.distance,
            },
          },
          filter?.mySetting?.discovery?.distance,
        );
      }
    }
    return queryFilter.buildQuery();
  }
}
