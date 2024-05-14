import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModuleModule } from 'src/app/modules/common-module/common-module.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/modals/dialog-box/dialog-box.component';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatDialogActions,
    MatDialogClose,
    CommonModuleModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent implements OnInit {
  authForm: FormGroup | any;
  formMode: 'signin' | 'signup' | any;
  constructor(
    public commonService: CommonServicesService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { formMode: 'signin' | 'signup' },
    public authService: AuthServiceService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.formMode = data.formMode;
  }
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?!.*(.)\\1{1})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$'
          ),
        ],
      ],
      confirm_password: [
        '',
        // [
        //   Validators.required,
        //   Validators.minLength(6),
        //   Validators.pattern(
        //     '^(?!.*(.)\\1{1})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$'
        //   ),
        // ],
      ],
    });
  }

  get errorControl() {
    return this.authForm?.controls;
  }

  submitForm() {
    if (this.authForm.valid) {
      if (this.formMode === 'signin') {
        this.signIn();
        console.log('Logging in with:', this.authForm.value);
      } else {
        // console.log('Signing up with:', this.authForm.value);
        this.signUp();
      }
    }
  }
  toggleFormMode() {
    this.formMode = this.formMode === 'signin' ? 'signup' : 'signin';
    this.authForm.reset();
  }

  async signUp() {
    try {
      if (this.authForm?.valid) {
        const password = this.authForm?.get('password')?.value;
        const email = this.authForm?.get('email')?.value;
        const confirm_password = this.authForm?.get('confirm_password')?.value;
        if (confirm_password !== password) {
          this.dialog.open(DialogBoxComponent, {
            backdropClass: 'backdrop-blur',
            width: '400px',
            height: 'auto',
            panelClass: 'rounded-lg',
            data: {
              message:
                'Password and confirm password does not match. Please verify your password then proceed.',
              title: 'Alert',
              dialogCss: 'danger-dialog',
              buttonText: 'OK',
              buttonCss: 'danger-dialog-btn',
            },
          });
        } else {
          // console.log('password', password, 'email', email);
          const encryptPass = await this.authService.encryptPass(password);

          let userData = {
            email: email,
            password: encryptPass,
          };

          const keyToSave = 'email';
          const newData = { [keyToSave]: userData[keyToSave] };

          this.commonService.setLocalStorage('userData', newData);
          const user = await this.authService.registerUser(userData);

          if (user) {
            // this.router.navigate(['/dashboard']);
            this.authService.autoLogout();
            // this.formMode = 'signin';
          } else {
            console.log('Registration failed. Provide correct values.');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async signIn() {
    try {
      if (this.authForm?.valid) {
        const email = this.authForm?.get('email')?.value;
        const password = this.authForm?.get('password')?.value;
        const encryptPass = await this.authService.encryptPass(password);

        let userData = {
          email: email,
          password: encryptPass,
        };

        const keyToSave = 'email';
        const newData = { [keyToSave]: userData[keyToSave] };

        this.commonService.setLocalStorage('userData', newData);
        const user = await this.authService.signinUser(userData);
        // console.log('user', user);

        // await this.authService.uploadDatatoFirebase(userData, 'users');

        if (user) {
          this.dialog.closeAll();
          // this.router.navigate(['/dashboard']);
          this.authService.autoLogout();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
