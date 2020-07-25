import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  get token(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }
  set token(token: string) {
    if (token) {
      localStorage.setItem('token', token);
    }
  }
}
