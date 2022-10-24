export class FilterBuilder<T> {
  public queryFilter: any = {
    $and: [],
  };

  public setFilterItem(key: keyof T, value: any) {
    if (!key || !value) return this;
    const subQuery = {
      key: value,
    };
    this.queryFilter['$and'].push(subQuery);
    return this;
  }

  buildQuery() {
    if (!this.queryFilter?.$and?.length) return {};
    return this.queryFilter;
  }
}
