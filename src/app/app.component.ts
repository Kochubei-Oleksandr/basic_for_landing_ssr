import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LanguageService} from '../shared/services/language.service';
import {InitialRequestsService} from '../shared/services/initial-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (
    private _router: Router,
    private _languageService: LanguageService,
    private _initialRequestsService: InitialRequestsService,
  ) {
    _languageService.ngOnInit();
  }

  isHomeRoute() {
    return this._router.url === '/';
  }

  ngOnInit(): void {
    this._initialRequestsService.unauthorized();
    this._initialRequestsService.languageChangeRequests();
    this._initialRequestsService.authorized();
  }
}
