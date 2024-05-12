import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModuleModule } from 'src/app/modules/common-module/common-module.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  formMode: 'login' | 'signup' | any;
  constructor(
    public commonService: CommonServicesService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { formMode: 'login' | 'signup' },
    private authService: AuthServiceService,
    private router: Router
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
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?!.*(.)\\1{1})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$'
          ),
        ],
      ],
    });
  }

  get errorControl() {
    return this.authForm?.controls;
  }

  submitForm() {
    if (this.authForm.valid) {
      if (this.formMode === 'login') {
        // console.log('Logging in with:', this.authForm.value);
      } else {
        // console.log('Signing up with:', this.authForm.value);
        this.signUp();
      }
    }
  }
  toggleFormMode() {
    this.formMode = this.formMode === 'login' ? 'signup' : 'login';
    this.authForm.reset();
  }

  async signUp() {
    try {
      if (this.authForm?.valid) {
        const password = this.authForm?.get('password')?.value;
        const email = this.authForm?.get('email')?.value;
        console.log('password', password, 'email', email);

        const encryptPass = await this.authService.encryptPass(password);

        // const user = await this.authService.registerUser(email, encryptPass);

        // if (user) {
        //   // this.router.navigate(['/']);
        //   this.formMode = 'login';
        // } else {
        //   console.log('Registration failed. Provide correct values.');
        // }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
