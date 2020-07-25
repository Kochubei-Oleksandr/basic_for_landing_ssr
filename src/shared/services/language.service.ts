import {EventEmitter, Injectable, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {SERVICE_LANGUAGES} from '../constants/service-languages.const';

@Injectable()
export class LanguageService implements OnInit {
  private _serviceLanguages = SERVICE_LANGUAGES;
  public currentLangEmit = new EventEmitter();

  constructor (private _translateService: TranslateService) {}

  ngOnInit() {
    this.setAvailableLanguages();
    this.setInitialLanguage();
  }
  setAvailableLanguages() {
    this._translateService.addLangs([this._serviceLanguages.en, this._serviceLanguages.ru]);
    this._translateService.setDefaultLang(this._serviceLanguages.en);
  }
  getInitialLanguage(): string {
    let langInLocalStorage = localStorage.getItem('language');
    return this._translateService.getLangs().includes(langInLocalStorage)
      ? langInLocalStorage
      : this._translateService.getDefaultLang();
  }
  setInitialLanguage() {
    this.currentLanguage = this.getInitialLanguage();
  }
  get currentLanguage(): string {
    return this._translateService.currentLang;
  }
  set currentLanguage(lang: string) {
    this._translateService.use(lang);
    localStorage.setItem('language', lang)
  }
}
