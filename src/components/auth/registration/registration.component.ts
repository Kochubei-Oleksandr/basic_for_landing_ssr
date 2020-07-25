import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {LINKS_FOR_DOCUMENTS} from '../../../shared/constants/links-for-documents.const';
import {PdfModalDialogComponent} from '../../../shared-components/pdf-modal-dialog/pdf-modal-dialog.component';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {ServerValidationFormService} from '../../../shared/services/server-validation-form.service';
import {InitialRequestsService} from '../../../shared/services/initial-requests.service';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registerFormGroup: FormGroup;
  public privacyPDFSrc: string = LINKS_FOR_DOCUMENTS.privacyPDFSrc;
  public agreementPDFSrc: string = LINKS_FOR_DOCUMENTS.agreementPDFSrc;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _dialog: MatDialog,
    public serverValidationForm: ServerValidationFormService,
    private _initialRequestsService: InitialRequestsService,
  ) {
  }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(): void {
    this.registerFormGroup = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: [''],
      usage_policy: [false, [Validators.requiredTrue]],
    }, {validator: [this.checkPasswords, this.checkUsagePolicy]});
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'];
    let confirmPass = group.controls['password_confirmation'];

    return pass.value === confirmPass.value
      ? confirmPass.setErrors(null)
      : confirmPass.setErrors({ notSame: true })
  }
  checkUsagePolicy(group: FormGroup) {
    let usagePolicy = group.controls['usage_policy'];

    return usagePolicy.value
      ? usagePolicy.setErrors(null)
      : usagePolicy.setErrors({ notUsagePolicy: true })
  }
  openIframePDFDialog(linkToPdf) {
    this._dialog.open(PdfModalDialogComponent, {
      width: '800px',
      height: '600px',
      data: {
        linkToPdf: linkToPdf,
      }
    });
  }
  isRequestComplete(): boolean {
    return this._authService.getRequestStatus()
  }
  submit() {
    this._authService.setRequestStatus(false);

    this._authService.register(this.registerFormGroup.value).subscribe(
      () => {
        this._dialog.closeAll();
        this._authService.setRequestStatus(true);
        this._initialRequestsService.authorized();
      },
      (res) => {
        this._authService.setRequestStatus(true);
        if (res.status === 422) {
          this.serverValidationForm.showErrors(res.error.errors, this.registerFormGroup.controls);
        }
      }
    );
  }
  openLoginDialog() {
    this._dialog.closeAll();
    this._dialog.open(LoginComponent, {
      width: '350px'
    });
  }
}
