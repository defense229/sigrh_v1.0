import { HTMLAttributes, ReactElement, SVGAttributes } from 'react';

export * from './colors';
export * from './variables';
export * from './keys';
export type CommonElement = string | ReactElement | ReactElement[];
export interface ICommonElement extends HTMLAttributes<HTMLElement> {}
export interface ISvg extends SVGAttributes<SVGElement> {}
