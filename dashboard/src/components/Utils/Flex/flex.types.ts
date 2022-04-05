import { HTMLAttributes, ReactElement } from 'react';

export type TFlexPosition = 'start' | 'end' | 'center' | 'between' | 'around';

export interface IFlex extends HTMLAttributes<HTMLElement> {
  justify?: TFlexPosition;
  items?: TFlexPosition;
  gap?: string;
  children: ReactElement | ReactElement[];
  direction?: 'row' | 'col';
}
