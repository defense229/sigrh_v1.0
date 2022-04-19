import { HTMLAttributes, ReactElement, SVGAttributes } from 'react';

export * from './variables';
export * from './colors';
export * from './auth';
export * from './upload';

export type CommonElement = string | ReactElement | ReactElement[];
export interface ICommonElement extends HTMLAttributes<HTMLElement> {}
export interface ISvg extends SVGAttributes<SVGElement> {}
