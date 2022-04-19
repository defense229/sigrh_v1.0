import React, { useMemo } from 'react';
import { TColors, __COLORS } from '../../services/types';

export interface ISpinner {
  color?: TColors;
  weight?: number;
  radius?: number;
}

const getStyle = (options: ISpinner) => {
  const style = {
    width: `${options.radius}px`,
    height: `${options.radius}px`,
    border: `solid ${options.weight}px transparent`,
    borderTop: `solid ${options.weight}px ${
      __COLORS[options.color ?? 'white']
    }`,
    borderRight: `solid ${options.weight}px ${
      __COLORS[options.color ?? 'white']
    }`,
  };
  return style;
};

function Spinner({ color = 'white', weight = 1, radius = 15 }: ISpinner) {
  const style = useMemo(
    () => getStyle({ color, weight, radius }),
    [color, weight, radius]
  );
  return <div className="spinner" style={style}></div>;
}

export default Spinner;
