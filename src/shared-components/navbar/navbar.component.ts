import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MENU_ITEMS} from '../../shared/constants/menu-items.const';
import {IMenuItems} from '../../shared/interfaces/menu-items.interface';
import {ROUTING_NAMES} from '../../shared/constants/routing-names.const';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isLanding: boolean;
  private _menuItems: IMenuItems | any = MENU_ITEMS;
  public isSticky: boolean = false;

  constructor (
    private _router: Router,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
  ) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll():void {
    if (this.isLanding === true) {
      this.isSticky = window.pageYOffset >= 1;
    }
  }
  getClassDecorator(mainClass: string): string {
    return this.isLanding
      ? this.isSticky ? (mainClass + '--sticky') : (mainClass + '--no-sticky')
      : (mainClass + '--no-landing');
  }
  goToHomePage() {
    this._router.navigate([ROUTING_NAMES.home]);
  }
  getMenuItems() {
    return Object.values(this._menuItems);
  }
  isMenuItemActive(url: string): boolean {
    return this._router.url === '/' + url;
  }
  goToSelectedPage(url: string) {
    this._router.navigate([url]);
  }
}
