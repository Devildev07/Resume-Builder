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
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewTemplateComponent } from 'src/app/modals/view-template/view-template.component';

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

  recivedTemplateData: any;


  constructor(
    public commonService: CommonServicesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {

    // commonService.getData()
    // this.recivedTemplateData = this.commonService.getData();
    // console.log(this.recivedTemplateData);

  }

  ngOnInit() {
    this.resumeFormGroup = this.formBuilder.group({
      personalDetails: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        jobTitle: ['', Validators.required],
        email: ['', Validators.required, [this.asyncEmailValidator]],
        phone: ['', Validators.required],
        birthDate: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
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
      skillDetails: this.formBuilder.array([this.createdSkillFormGroup()]),
      languageDetails: this.formBuilder.array([this.createdLanguageFormGroup()]),
      projectDetails: this.formBuilder.array([this.createdProjectFormGroup()]),
    });
  }

  // education-section
  createdEduDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      institutionName: ['', Validators.required],
      studyField: ['', Validators.required],
      degree: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      city: [''],
      grade:['',Validators.required],
      description:['', Validators.required],
    });
  }
  get educationalDetails(): FormArray {
    return this.resumeFormGroup.get('educationalDetails') as FormArray;
  }

  // experience-section
  createdExpDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      city: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      experienceYear: [''],
      description: [''],
    });
  }
  get experienceDetails(): FormArray {
    return this.resumeFormGroup.get('experienceDetails') as FormArray;
  }

  //skill-section
  createdSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      skillName: ['', Validators.required],
      skillValue: [''],
    });
  }
  get skillDetails(): FormArray {
    return this.resumeFormGroup.get('skillDetails') as FormArray;
  }

  //skill-section
  createdLanguageFormGroup(): FormGroup {
    return this.formBuilder.group({
      languageName: [''],
      languageValue: [''],
    });
  }
  get languageDetails(): FormArray {
    return this.resumeFormGroup.get('languageDetails') as FormArray;
  }

  //project-section
  createdProjectFormGroup(): FormGroup {
    return this.formBuilder.group({
      projectTitle: ['', Validators.required],
      projectLink: ['', Validators.required],
      projectCodeLink: [''],
      projectTechUsed: [''],
      projectYear: [''],
      projectDescription: [''],
    });
  }
  get projectDetails(): FormArray {
    return this.resumeFormGroup.get('projectDetails') as FormArray;
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

  addDetails(
    type:
      | 'educationalDetails'
      | 'experienceDetails'
      | 'skillDetails'
      | 'projectDetails'
      | 'languageDetails'
  ): void {
    const details = this.resumeFormGroup.get(type) as FormArray;
    if (type === 'educationalDetails') {
      details.push(this.createdEduDetailsFormGroup());
    } else if (type === 'experienceDetails') {
      details.push(this.createdExpDetailsFormGroup());
    } else if (type === 'skillDetails') {
      details.push(this.createdSkillFormGroup());
    } else if (type === 'projectDetails') {
      details.push(this.createdProjectFormGroup());
    }else if (type === 'languageDetails') {
      details.push(this.createdLanguageFormGroup());
    }
  }

  deleteDetails(
    type:
      | 'educationalDetails'
      | 'experienceDetails'
      | 'skillDetails'
      | 'projectDetails'
      | 'languageDetails',
    i: number
  ): void {
    const details = this.resumeFormGroup.get(type) as FormArray;
    details.removeAt(i);
  }

  submitResumeForm() {
    if (this.resumeFormGroup.valid) {
      this.allResumeData = {};
      var data = {
        formBuilder: this.resumeFormGroup.value,
        title: this.resumetitle,
      };
      this.allResumeData = data;
      // this.allResumeData.push(this.resumeFormGroup.value)
      // this.allResumeData.push(this.resumetitle)
      console.log('firstFormGroup data here', this.allResumeData);
    }
    console.log('firstFormGroup not valid enteries');
  }

  viewResume() {
    // this.commonService.getData()
    this.recivedTemplateData = this.commonService.getData();
    console.log("this.recivedTemplateData",this.recivedTemplateData);
    this.dialog.open(ViewTemplateComponent, {
      backdropClass: 'backdrop-blur',
      width: '1024px',
      height: '640px',
      panelClass: 'rounded-md',
      data: this.recivedTemplateData,
    })
  }
}
