import React, { useRef, useImperativeHandle, forwardRef } from 'react';

export type vec2 = [number, number];

const DatasetCanvas: React.SFC<Props> = (props, ref): React.ReactElement => {
  const innerRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    get element() {
      return innerRef.current;
    },
    get context() {
      return (this.element && this.element.getContext('2d')) || null;
    },
    draw(Z: vec2[], d: number = 1, C: (i: number) => string = () => '#000000') {
      if (this.element !== null && this.context !== null) {
        for (let i = 0; i < Z.length; i++) {
          this.context.fillStyle = C(i);
          this.context.fillRect(Z[i][0] * this.element.width, (1 - Z[i][1]) * this.element.height, d, d);
        }
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
  draw(Z: vec2[], d?: number, C?: (i: number) => string): void;
  clear(): void;
}

export default forwardRef(DatasetCanvas);
