import {IMenuItems} from '../interfaces/menu-items.interface';
import {ROUTING_NAMES} from './routing-names.const';

export const MENU_ITEMS: IMenuItems = {
  home: {
    id: 1,
    url: ROUTING_NAMES.home,
    name: 'home',
    icon: 'home',
    isActive: false,
  },
};
