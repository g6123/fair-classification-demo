export const TP = 'hsl(186.8, 100%, 30%)';
export const FN = 'hsl(186.8, 100%, 70%)';
export const FP = 'hsl(6.8, 100%, 70%)';
export const TN = 'hsl(6.8, 100%, 30%)';

export const TRANSPARENT = 'rgba(255, 255, 255, 0)';

export const get = (y: number, y_: number): string => {
  if (y && y_) {
    return TP;
  } else if (y && !y_) {
    return FN;
  } else if (!y && y_) {
    return FP;
  } else if (!y && !y_) {
    return TN;
  } else {
    return '';
  }
};
