import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LanguageService} from '../shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private _router: Router,
    private _languageService: LanguageService,
  ) {
    _languageService.ngOnInit();
  }

  isHomeRoute() {
    return this._router.url === '/';
  }
}
