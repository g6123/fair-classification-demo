export type RGBA = [number, number, number, number];

export const COLOR_TP: RGBA = [0, 136, 153, 255];
export const COLOR_FN: RGBA = [0, 136, 153, 110];
export const COLOR_FP: RGBA = [153, 17, 0, 110];
export const COLOR_TN: RGBA = [153, 17, 0, 255];
export const COLOR_NONE: RGBA = [255, 255, 255, 255];

export const rgba = (raw: RGBA): string => `rgba(${raw[0]}, ${raw[1]}, ${raw[2]}, ${raw[3] / 255})`;

export const color = (y: number, y_: number): RGBA => {
  if (y && y_) {
    return COLOR_TP;
  } else if (y && !y_) {
    return COLOR_FN;
  } else if (!y && y_) {
    return COLOR_FP;
  } else if (!y && !y_) {
    return COLOR_TN;
  } else {
    return COLOR_NONE;
  }
};
