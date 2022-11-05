import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterBuilder } from '../../../utils/filter.query';
import {
  FilterGetAllUser,
  NewInformationAfterLogin,
} from '../dto/create-user.dto';
import { Address, User } from '../entities/user.entities';
import { UserModelType } from '../schema/user.schema';
import axios from 'axios';
import { StatusActive } from '../../../constants/enum';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class UserHelper {
  constructor(
    @InjectModel(User.name) private userModel: UserModelType,
    private loggerService: LoggerService,
  ) {}

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
      queryFilter.setFilterItemWithObject(
        'mySetting.discovery.minAge',
        {
          $gte: filter?.mySetting?.discovery?.minAge,
        },
        filter?.mySetting?.discovery?.minAge,
      );
      queryFilter.setFilterItemWithObject(
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

  async setNewInfoAfterLogin(newIf: NewInformationAfterLogin): Promise<void> {
    try {
      console.log(newIf.coordinates);
      const [location, user] = await Promise.all([
        axios.get(
          `https://location-api-mu.vercel.app/query?lat=${newIf.coordinates[1]}&lon=${newIf.coordinates[0]}`,
        ),
        this.userModel.findOneAndUpdate(
          { _id: newIf.user._id },
          {
            $set: {
              statusActive: StatusActive.ONLINE,
              lastActive: Date.now(),
              geoLocation: {
                coordinates: [newIf.coordinates[0], newIf.coordinates[1]],
              },
            },
          },
        ),
      ]);
      this.loggerService.debug(location.data);
      const { city, district, country } = this.handleResponseAddress(location);
      user.address = new Address();
      user.address.city = city;
      user.address.district = district;
      user.address.country = country;
      await user.save();
    } catch (error) {
      throw error;
    }
  }
  handleResponseAddress(location: any): Address {
    const state = location.data['locationDetail']['state'];
    const city_district = location.data['locationDetail']['city_district'];
    const county = location.data['locationDetail']['county'];
    let city = location.data['locationDetail']['city'];
    city = city ? city : state;
    const district = city_district ? city_district : county;
    this.loggerService.debug(
      `State: ${state},District: ${district},City: ${city}`,
    );
    const country = location.data['locationDetail']['country'];
    return { district, city, country };
  }
}
