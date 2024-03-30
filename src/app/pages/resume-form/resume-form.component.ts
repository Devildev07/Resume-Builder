import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    provideNativeDateAdapter(),
  ],
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css',
})
export class ResumeFormComponent {
  resumetitle: any;
  allResumeData: any = {};
  firstFormGroup: FormGroup | any;
  secondFormGroup: FormGroup | any;
  resumeFormGroup: FormGroup | any;
  personalDetails: any[] = [];
  educationalDetails: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
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
      institutionName: ['', Validators.required],
      studyField: ['', Validators.required],
      degree: ['', Validators.required],
      city: [''],
      startDate: [''],
      endDate: [''],
    });
  }


  // Usage example

  // submitResumeForm() {
  //   if (this.resumeFormGroup.valid) {
  //     this.allResumeData = this.resumeFormGroup.value;
  //     // this.allResumeData = this.personalDetails.push(this.resumetitle);
  //     console.log('firstFormGroup data here', this.allResumeData);
  //   }
  //   console.log('firstFormGroup not valid enteries');
  // }

  submitPerDetForm() {
    if (this.firstFormGroup.valid) {
      this.personalDetails = this.firstFormGroup.value;
      // this.allResumeData = this.personalDetails.push(this.resumetitle);
      console.log('firstFormGroup data here', this.personalDetails);
    }
  }
  submitEduDetForm() {
    if (this.secondFormGroup.valid) {
      this.educationalDetails = this.secondFormGroup.value;
      // this.allResumeData = this.educationalDetails.push(this.resumetitle);
      console.log('secondFormGroup data here', this.educationalDetails);
    }
  }
}
