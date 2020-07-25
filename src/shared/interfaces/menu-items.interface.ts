export interface IMenuItems {
  home: IMenuItem,
}

export interface IMenuItem {
  id: number,
  url: string,
  name: string,
  icon: string,
  isActive: boolean,
}
