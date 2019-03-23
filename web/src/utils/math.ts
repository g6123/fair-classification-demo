export type ConfusionMatrix = [[number, number], [number, number]];

export const percent = (float: number): number => Math.round(float * 10000) / 100;

export const sum = (arr: number[]): number => arr.reduce((a, i) => a + i, 0);

export const cmSum = (cm: ConfusionMatrix, indicies: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1]]): number =>
  indicies.reduce((acc, index) => acc + cm[index[0]][index[1]], 0);
