import React, { useRef, useImperativeHandle, forwardRef } from 'react';

export type vec2 = [number, number];
export type vec4 = [number, number, number, number];

const DatasetCanvas: React.SFC<Props> = (props, ref): React.ReactElement => {
  const innerRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    get element() {
      return innerRef.current;
    },
    get context() {
      return (this.element && this.element.getContext('2d')) || null;
    },
    drawPoints(Z: vec2[], d: number = 1, C: (i: number) => vec4) {
      if (this.element !== null && this.context !== null) {
        /* eslint-disable @typescript-eslint/camelcase */
        const w = this.element.width;
        const h = this.element.height;
        const d_l = Math.round(d / 2);
        const d_r = d - d_l;
        let i, x_c, y_c, x, y, c, o;

        const imageData = this.context.getImageData(0, 0, w, h);

        for (i = 0; i < Z.length; i++) {
          x_c = Math.round(Z[i][0] * w);
          y_c = Math.round((1 - Z[i][1]) * h);
          c = C(i);

          for (x = x_c - d_l; x < x_c + d_r; x++) {
            for (y = y_c - d_l; y < y_c + d_r; y++) {
              for (o = 0; o < 4; o++) {
                imageData.data[(x + y * w) * 4 + o] = c[o];
              }
            }
          }
        }

        this.context.putImageData(imageData, 0, 0);
      }
    },
    clear() {
      if (this.element !== null && this.context !== null) {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
      }
    },
  }));

  return <canvas ref={innerRef} {...props} />;
};

export interface Props extends React.HTMLAttributes<HTMLCanvasElement> {
  width: number;
  height: number;
}

export interface Ref {
  element: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  drawPoints(Z: vec2[], d?: number, C?: (i: number) => vec4): void;
  clear(): void;
}

export default forwardRef(DatasetCanvas);
