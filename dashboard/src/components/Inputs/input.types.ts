import { InputHTMLAttributes } from 'react';
import { CommonElement } from '../../services/libs';
import { TColors } from '../../services/types/style.types';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  color?: TColors;
  actions?: InputAction | null;
}

export interface ITextArea extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string | null;
  color?: TColors;
  actions?: InputAction | null;
}

interface InputAction {
  left?: CommonElement;
  right?: CommonElement;
}
