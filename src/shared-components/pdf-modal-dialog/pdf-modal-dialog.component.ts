import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'pdf-modal-dialog',
  templateUrl: './pdf-modal-dialog.component.html'
})
export class PdfModalDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    public _domSanitizer: DomSanitizer
  ) {

  }
}