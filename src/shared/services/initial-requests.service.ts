import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class InitialRequestsService {
  constructor (
    private _translateService: TranslateService,
    private _localStorageService: LocalStorageService,
  ) { }

  languageChangeRequests(): void {
    this._translateService.onLangChange.subscribe(() => {
      this.unauthorized();
    });
  }

  unauthorized(): void {
    //queries to get static data from the database
  }
  authorized(): void {
    if (localStorage.getItem('token')) {
      //queries to get static data from the database
    }
  }
}
