import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {InitialRequestsService} from '../../../shared/services/initial-requests.service';
import {RegistrationComponent} from '../registration/registration.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _initialRequestsService: InitialRequestsService,
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(): void {
    this.loginFormGroup = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  isRequestComplete(): boolean {
    return this._authService.getRequestStatus()
  }
  submit() {
    this._authService.setRequestStatus(false);

    this._authService.login(this.loginFormGroup.value).subscribe(
      () => {
        this._dialog.closeAll();
        this._authService.setRequestStatus(true);
        this._initialRequestsService.authorized();
      },
      () => {
        this._authService.setRequestStatus(true);
      }
    );
  }
  openRegistrationDialog() {
    this._dialog.closeAll();
    this._dialog.open(RegistrationComponent, {
      width: '444px'
    });
  }
}
