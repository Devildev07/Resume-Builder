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
  ValidationErrors,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  // firstFormGroup: FormGroup | any;
  // secondFormGroup: FormGroup | any;
  resumeFormGroup: FormGroup | any;
  // personalDetails: any[] = [];
  // educationalDetails: any[] = [];
  FormArray: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.resumeFormGroup = this.formBuilder.group({
      personalDetails: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        // email: [
        //   '',
        //   Validators.required,
        //   Validators.email,
        //   Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        // ],
        email: ['', Validators.required, [this.asyncEmailValidator]],
        phone: ['', Validators.required],
        birthDate: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        website: [''],
        description: [''],
      }),
      educationalDetails: this.formBuilder.array([
        this.createdEduDetailsFormGroup(),
      ]),
    });
  }

  createdEduDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      institutionName: ['', Validators.required],
      studyField: ['', Validators.required],
      degree: ['', Validators.required],
      city: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  addEduDetails(): void {
    const eduDetails = this.resumeFormGroup.get(
      'educationalDetails'
    ) as FormArray;
    eduDetails.push(this.createdEduDetailsFormGroup());
  }

  removeEduDetails(i: number): void {
    const eduDetails = this.resumeFormGroup.get(
      'educationalDetails'
    ) as FormArray;
    eduDetails.removeAt(i);
  }

  get educationalDetails(): FormArray {
    return this.resumeFormGroup.get('educationalDetails') as FormArray;
  }

  submitResumeForm() {
    if (this.resumeFormGroup.valid) {
      this.allResumeData = this.resumeFormGroup.value;
      // this.allResumeData = this.personalDetails.push(this.resumetitle);
      console.log('firstFormGroup data here', this.allResumeData);
    }
    console.log('firstFormGroup not valid enteries');
  }

  asyncEmailValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Observable((observer) => {
      // Simulating asynchronous validation with a timeout
      setTimeout(() => {
        if (
          control.value &&
          !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value)
        ) {
          observer.next({ invalidEmail: true }); // Return validation error
        } else {
          observer.next(null); // No error
        }
        observer.complete();
      }, 1000); // Adjust timeout as needed
    });
  }
}
