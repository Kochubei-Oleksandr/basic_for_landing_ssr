import { Injectable } from '@angular/core';
import { LogNotificationService } from './log-notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isRequestComplete: boolean = true;

  constructor(
    protected _http: HttpClient,
    protected _notification: LogNotificationService,
    protected _router: Router
  ) { }

  public getEndpoint(route: string): string {
    return environment.API + route;
  }

  public sendPost(url: string, data: any = {}, options: object = {}) {
    return this._http.post(url, data, options)
  }

  public sendPut(url: string, data: any = {}, options: object = {}) {
    return this._http.put(url, data, options);
  }

  public sendGet(url: string, options: any = {}) {
    return this._http.get(url, options);
  }

  public sendDelete(url: string, options: any = {}) {
    return this._http.delete(url, options);
  }

  public setRequestStatus(value: boolean): void {
    this.isRequestComplete = value;
  }

  public getRequestStatus(): boolean {
    return this.isRequestComplete;
  }

  public onError(error: Response) {
    this.setRequestStatus(true);

    if (error.status !== 422) {
      let message = error.statusText;

      let regexError500 = RegExp('5[0-9][0-9]');
      if(regexError500.test(String(error.status))) {
        message = 'Server error, try again later';
      }

      this._notification.error(
        `${error.status} - ${message}`,
        null,
        true
      );
    }

    return throwError(error);
  }
}
