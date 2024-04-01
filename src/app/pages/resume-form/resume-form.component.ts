import { Component } from '@angular/core';
import {
  FormBuilder,
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
import { MatSliderModule } from '@angular/material/slider';

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
    MatSliderModule,
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css',
})
export class ResumeFormComponent {
  resumetitle: any;
  allResumeData: any = {};
  resumeFormGroup: FormGroup | any;

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
      experienceDetails: this.formBuilder.array([
        this.createdExpDetailsFormGroup(),
      ]),
      skill: this.formBuilder.array([this.createdSkillFormGroup()]),
    });
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

  addDetails(type: 'educationalDetails' | 'experienceDetails'): void {
    const details = this.resumeFormGroup.get(type) as FormArray;
    if (type === 'educationalDetails') {
      details.push(this.createdEduDetailsFormGroup());
    } else if (type === 'experienceDetails') {
      details.push(this.createdExpDetailsFormGroup());
    }
  }

  deleteDetails(
    type: 'educationalDetails' | 'experienceDetails',
    i: number
  ): void {
    const details = this.resumeFormGroup.get(type) as FormArray;
    details.removeAt(i);
  }

  // educationsection
  createdEduDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      institutionName: ['', Validators.required],
      studyField: ['', Validators.required],
      degree: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      city: [''],
    });
  }
  get educationalDetails(): FormArray {
    return this.resumeFormGroup.get('educationalDetails') as FormArray;
  }

  // experiencesection
  createdExpDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      city: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
    });
  }

  get experienceDetails(): FormArray {
    return this.resumeFormGroup.get('experienceDetails') as FormArray;
  }

  submitResumeForm() {
    if (this.resumeFormGroup.valid) {
      this.allResumeData = this.resumeFormGroup.value;
      // this.allResumeData = this.personalDetails.push(this.resumetitle);
      console.log('firstFormGroup data here', this.allResumeData);
    }
    console.log('firstFormGroup not valid enteries');
  }

  // custome chip and slider

  get skill(): FormArray {
    return this.resumeFormGroup.get('skill') as FormArray;
  }

  skills: string[] = [];
  newSkill: string = '';
  sliderValue: number = 0;
  sliderValues: number[] = [];
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;

  addSkill(): void {
    if (this.newSkill.trim() !== '' && !this.skills.includes(this.newSkill)) {
      this.skills.push(JSON.parse(JSON.stringify(this.newSkill)) );
      this.sliderValues.push(JSON.parse(JSON.stringify(this.sliderValue)));
      this.newSkill = '';
    }
  }

  removeSkill(index: number): void {
    this.skills.splice(index, 1);
    this.sliderValues.splice(index, 1);
  }

  updateSliderValue(): void {
    if (this.sliderValues.length > 0) {
      this.sliderValues[this.sliderValues.length - 1] = this.sliderValue;
    }
  }

  // experiencesection
  createdSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      skill: ['', Validators.required],
    });
  }

  get skillDetails(): FormArray {
    return this.resumeFormGroup.get('skill') as FormArray;
  }
}
