import { CommonElement } from '../../services/libs';

export interface IModal {
  title: string;
  open?: boolean;
  onClose?: () => void;
  children?: CommonElement;
}
