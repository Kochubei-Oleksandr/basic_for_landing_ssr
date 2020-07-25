import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../../models/user/user.class';
import {catchError, map} from 'rxjs/operators';
import {IAuth} from '../../../components/auth/auth.interface';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  register(user: User) {
    return this
      .sendPost(this.getEndpoint('register'), user)
      .pipe(
        map((res: IAuth) => this.setToken(res.token)),
        catchError((err) => this.onError(err))
      );
  }
  login(user: User) {
    return this
      .sendPost(this.getEndpoint('login'), user)
      .pipe(
        map((res: IAuth) => this.setToken(res.token)),
        catchError((err) => this.onError(err))
      );
  }
  refreshToken() {
    return this.sendPost(this.getEndpoint('refresh-token'));
  }
  setToken(token): void {
    localStorage.setItem('token', token);
  }
  static getToken(): string {
    return localStorage.getItem('token');
  }
  static isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  backendLogout():void {
    this.sendPost(this.getEndpoint('logout'))
      .pipe(
        catchError((err) => this.onError(err))
      )
      .subscribe(
        () => {
          this.frontendLogout();
        },
        (err) => {
          return throwError(err);
        }
      );
  }
  frontendLogout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
