import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {LanguageService} from '../services/language.service';
import {SERVICE_LANGUAGES} from '../constants/service-languages.const';

@Injectable()
export class ApiConfigInterceptor implements HttpInterceptor {

  private _serviceLanguages = SERVICE_LANGUAGES;
  constructor (public _languageService: LanguageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Language': this._languageService.currentLanguage ? this._languageService.currentLanguage : this._serviceLanguages.en,
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });

    return next.handle(request);
  }
}
