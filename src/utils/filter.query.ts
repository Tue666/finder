import { MySetting, User } from '../modules/user/entities/user.entities';

export class FilterBuilder<T> {
  public queryFilter: any = {
    $and: [],
  };

  public setFilterItem(key: keyof T | any, query: any, value: any) {
    if (!key || !value) return this;
    const subQuery = {
      [key]: query,
    };
    this.queryFilter['$and'].push(subQuery);
    return this;
  }

  buildQuery() {
    if (!this.queryFilter?.$and?.length) return {};
    return this.queryFilter;
  }
}

export class FilterUserBuilder extends FilterBuilder<User> {
  constructor() {
    super();
  }

  buildSetting(mySetting: MySetting, user: User) {
    if (mySetting.discovery.onlyShowAgeThisRange) {
      // this.setFilterItem('mySetting');
    }
    return this;
  }
}
