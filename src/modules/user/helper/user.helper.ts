import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterBuilder } from '../../../utils/filter.query';
import {
  FilterGetAllUser,
  FilterStatisticUser,
  NewInformationAfterLogin,
} from '../dto/create-user.dto';
import { Address, User, UserResult } from '../entities/user.entities';
import { UserModelType } from '../schema/user.schema';
import axios from 'axios';
import { RoleEnum, StatusActive } from '../../../constants/enum';
import { LoggerService } from '../../logger/logger.service';
import { UserEmbeddedService } from '../../user_embedded/user_embedded.service';
import { PaginationInput } from '../../common/dto/common.dto';
import { setFilterByDate } from '../../../utils/utils';

@Injectable()
export class UserHelper {
  constructor(
    @InjectModel(User.name) private userModel: UserModelType,
    private loggerService: LoggerService,
    private userEmbeddedService: UserEmbeddedService,
  ) {}

  async buildQueryWithUser(user: User, filter: FilterGetAllUser): Promise<any> {
    const isApplyAge = user.mySetting.discovery.onlyShowAgeThisRange;

    const queryFilter: FilterBuilder<User> = new FilterBuilder<User>()
      .setFilterItem('matched', { $in: filter?.matched }, filter?.matched)
      .setFilterItem(
        'statusActive',
        { $eq: filter?.statusActive },
        filter?.statusActive,
      )
      .setFilterItem(
        'showMeTinder',
        { $eq: user.showMeTinder },
        user.showMeTinder,
      );

    if (isApplyAge) {
      queryFilter.setFilterItem(
        'age',
        {
          $gte: user.mySetting.discovery.minAge,
          $lte: user.mySetting.discovery.maxAge,
        },
        user.mySetting.discovery.minAge,
      );
    }
    const user_ids: string[] = await this.userEmbeddedService.getAllIdsNotLike(
      user._id.toString(),
    );
    user_ids.push(user._id);
    console.log(user_ids);
    queryFilter.setFilterItem('_id', { $nin: user_ids }, user._id.toString());
    return queryFilter.buildQuery()[0];
  }

  async setNewInfoAfterLogin(newIf: NewInformationAfterLogin): Promise<void> {
    try {
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

  async getCurrentAddress(user: User): Promise<Address> {
    const location = await axios.get(
      `https://location-api-mu.vercel.app/query?lat=${user.geoLocation.coordinates[1]}&lon=${user.geoLocation.coordinates[0]}`,
    );
    return this.handleResponseAddress(location);
  }
  // admin
  async confirmBlockUser(_id: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id },
        { $set: { isBlocked: true } },
      );
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async declineBlockUser(_id: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id },
        { $set: { reports: [] } },
      );
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async getAllReportedUser(pagination: PaginationInput): Promise<UserResult> {
    try {
      const query = {
        reports: { $exists: true, $ne: [] },
        isDeleted: false,
        isBlocked: false,
        role: RoleEnum.USER,
      };
      const [queryFilter, querySort] = new FilterBuilder<User>()
        .addSubQuery(query)
        .setSortItem('username', 'asc')
        .buildQuery();
      const [results, totalCount] = await Promise.all([
        this.userModel
          .find(queryFilter)
          .skip((pagination?.page - 1) * pagination?.size)
          .limit(pagination?.size)
          .populate('reports.reportBy')
          .sort(querySort),
        this.userModel.countDocuments(queryFilter),
      ]);
      return { results, totalCount };
    } catch (error) {
      throw error;
    }
  }

  async statisticUser(
    pagination: PaginationInput,
    filter: FilterStatisticUser,
  ): Promise<UserResult> {
    try {
      const queryFilterByDate = setFilterByDate(filter.filterByDate);
      const [queryFilter, querySort] = new FilterBuilder()
        .addName(filter.username)
        .addSubQuery({ createdAt: queryFilterByDate })
        .addSortOption(filter.sortOption)
        .buildQuery();
      const [results, totalCount] = await Promise.all([
        this.userModel
          .find(queryFilter)
          .skip((pagination?.page - 1) * pagination?.size)
          .limit(pagination?.size)
          .sort(querySort),
        this.userModel.countDocuments(queryFilter),
      ]);
      return { results, totalCount };
    } catch (error) {
      throw error;
    }
  }
}
