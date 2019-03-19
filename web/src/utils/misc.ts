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
