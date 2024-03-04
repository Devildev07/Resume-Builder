import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModuleModule } from 'src/app/modules/common-module/common-module.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatDialogActions,
    MatDialogClose,
    CommonModuleModule,
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
    @Inject(MAT_DIALOG_DATA) public data: { formMode: 'login' | 'signup' }
  ) {
    this.formMode = data.formMode;
  }
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  submitForm() {
    if (this.authForm.valid) {
      if (this.formMode === 'login') {
        console.log('Logging in with:', this.authForm.value);
      } else {
        console.log('Signing up with:', this.authForm.value);
      }
    }
  }
  toggleFormMode() {
    this.formMode = this.formMode === 'login' ? 'signup' : 'login';
    this.authForm.reset();
  }
}
