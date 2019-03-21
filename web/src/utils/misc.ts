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
