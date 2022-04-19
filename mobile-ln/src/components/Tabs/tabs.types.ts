import { CommonElement } from '../../services/libs';

export interface IRouterTab {
  title: string;
  url: string;
}

export interface ITab {
  title: string;
  component?: CommonElement | null;
  url?: string;
}

export interface IRouterTabs {
  tabs: IRouterTab[];
}

export interface ITabs {
  tabs: ITab[];
}
