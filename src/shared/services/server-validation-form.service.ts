import { Injectable } from '@angular/core';

@Injectable()
export class ServerValidationFormService {
  private _serverValidationErrors: object = {};
  private _duration: number = 1000;
  private _error: object = {'serverValidationError': true};

  isServerValidationError(formControlName: string): boolean {
    return this._serverValidationErrors.hasOwnProperty(formControlName);
  }
  getServerValidationError(formControlName: string): string {
    return this._serverValidationErrors[formControlName][0];
  }
  setServerValidationErrors(error: object): void {
    this._serverValidationErrors = error;
  }
  setValidationError(formGroupControls, error: object | null): void {
    for (let key in formGroupControls) {
      if(this._serverValidationErrors.hasOwnProperty(key)) {
        formGroupControls[key].setErrors(error);
      }
    }
  }
  removeServerValidationErrors(formGroupControls) {
    this.setValidationError(formGroupControls, null);
    this._serverValidationErrors = {};
  }
  showErrors(error: object, formGroupControls, duration?: number) {
    this.setServerValidationErrors(error);
    this.setValidationError(formGroupControls, this._error);
    setTimeout(() =>
      this.removeServerValidationErrors(formGroupControls),
    duration || this._duration
    );
  }
}
