import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css',
})
export class ResumeFormComponent {
  resumetitle: any;
  allResumeData: any = {};
  firstFormGroup: FormGroup | any;
  secondFormGroup: FormGroup | any;
  personalDetails: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      website: [''],
      description: [''],
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  submitPerDetForm() {
    if (this.firstFormGroup.valid) {
      this.personalDetails = this.firstFormGroup.value;
      this.allResumeData = this.personalDetails.push(this.resumetitle);
      console.log('firstFormGroup data here', this.allResumeData);
    }
  }
}
