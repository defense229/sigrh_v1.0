import { ReactElement } from 'react';
import { CommonElement } from '../../services/libs';
import { TColors } from '../../services/types';

export interface IModal {
  title: string;
  open?: boolean;
  onClose?: () => void;
  children?: CommonElement;
}

export interface IToast {
  children: string | ReactElement;
  icon?: null | ReactElement;
  closable?: boolean;
  duration?: number;
  xpos?: 'left' | 'center' | 'right';
  ypos?: 'top' | 'bottom';
  open: boolean;
  onClose?: (x?: any) => void;
  color?: TColors;
}
