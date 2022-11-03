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
