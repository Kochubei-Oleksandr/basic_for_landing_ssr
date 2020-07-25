import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LogNotificationService {
  private _duration: number = 3000;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _translateService: TranslateService
  ) { }

  error(message: string, duration?: number, translate?: boolean): void {
    if(translate) {
      this._translateService.get(message).subscribe((translation) => {
        this._matSnackBar.open(translation, '', {panelClass: ['error'], duration: duration || this._duration});
      });
    } else {
      this._matSnackBar.open(message, '', {panelClass: ['error'], duration: duration || this._duration});
    }
  }
  warn(message: string, duration?: number): void {
    this._matSnackBar.open(message, '', {panelClass: ['warn'], duration: duration || this._duration});
  }
  success(message: string, duration?: number, translate?: boolean): void {
    if(translate) {
      this._translateService.get(message).subscribe((translation) => {
        this._matSnackBar.open(translation, '', {panelClass: ['success'], duration: duration || this._duration});
      });
    } else {
      this._matSnackBar.open(message, '', {panelClass: ['success'], duration: duration || this._duration});
    }
  }
}
