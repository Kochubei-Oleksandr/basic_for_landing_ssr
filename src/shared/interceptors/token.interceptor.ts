import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {Injectable, Injector} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {catchError, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {IAuth} from '../../components/auth/auth.interface';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (AuthService.getToken()) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + AuthService.getToken()
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const authService = this._injector.get(AuthService);

    return authService.refreshToken().pipe(
      switchMap((res: IAuth) => {
        if (res.token) {
          authService.setToken(res.token);
          request = request.clone({
            setHeaders: {
              'Authorization': 'Bearer ' + res.token
            }
          });
          return next.handle(request);
        } else {
          authService.frontendLogout();
        }
      }),
      catchError(err => {
        authService.frontendLogout();
        return throwError(err);
      })
    );
  }
}
