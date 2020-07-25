import {Component, Input} from '@angular/core';
import {SERVICE_LANGUAGES} from '../../../shared/constants/service-languages.const';
import {LanguageService} from '../../../shared/services/language.service';

@Component({
  selector: 'language-switching',
  templateUrl: './language-switching.component.html',
  styleUrls: ['./language-switching.component.scss']
})
export class LanguageSwitchingComponent {
  @Input() classDecorator: string;
  private _serviceLanguages = SERVICE_LANGUAGES;

  constructor (private _languageService: LanguageService) { }

  getServiceLanguage(): string {
    return this._languageService.currentLanguage;
  }
  setServiceLanguage(lang: string): void {
    const oldLanguage = this.getServiceLanguage();
    this._languageService.currentLanguage = lang;
    this._languageService.currentLangEmit.emit(oldLanguage);
  }
  getMenuItems() {
    return Object.values(this._serviceLanguages);
  }
  isMenuItemActive(lang: string): boolean {
    return this.getServiceLanguage() === lang;
  }
}
