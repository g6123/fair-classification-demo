export const noop = (): void => {};

export const reverse = <T>(arr: T[]): T[] => {
  const result = arr.slice();
  result.reverse();
  return result;
};

export const simpleRandomString = (): string =>
  Math.random()
    .toString(36)
    .substr(2, 5);

export const capitalize = (text: string): string =>
  text
    .split(' ')
    .map(w => w.substr(0, 1).toUpperCase() + w.substr(1))
    .join(' ');

export const get = <T>(target: any, path: string, defaultValue: any): T => {
  let result = target;

  for (const key of path.split('.')) {
    if (result === undefined || result === null) {
      return defaultValue;
    }

    result = result[key];
  }

  if (result === undefined || result === null) {
    return defaultValue;
  }

  return result;
};
