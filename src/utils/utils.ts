import { FilterByDate, SortOption } from '../constants/enum';

export function includesInObject<T>(
  array: Array<T>,
  key: keyof T,
  condition,
): boolean {
  return array.filter(item => {
    if (item[key] === condition) {
      return item;
    }
  }).length > 0
    ? true
    : false;
}

export function setFilterByDate(filterByDate: FilterByDate) {
  if (!filterByDate) {
    return {};
  }
  const currentDate: Date = new Date();
  const filterDate = {
    SEVEN_DAYS_AGO: {
      $gte: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDay() - 1,
      ),
      $lte: currentDate,
    },
    THIRTY_DAYS_AGO: {
      $gte: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDay(),
      ),
      $lte: currentDate,
    },
    THIS_YEAR: {
      $gte: new Date(currentDate.getFullYear(), 1, currentDate.getDay()),
      $lte: currentDate,
    },
  };
  return { ...filterDate[filterByDate] };
}

export function setFilterSortOption(sortOption: SortOption) {
  if (!sortOption) {
    return {};
  }
  const sortFilter = {
    AZ: { property: 'keyword', option: 'asc' },
    ZA: { property: 'keyword', option: 'desc' },
    AGE: { property: 'age', option: 1 },
  };
  return { ...sortFilter[sortOption] };
}
