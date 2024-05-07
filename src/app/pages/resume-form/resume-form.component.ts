import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
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
import { DialogBoxComponent } from 'src/app/modals/dialog-box/dialog-box.component';

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
export class ResumeFormComponent implements OnInit, AfterViewInit {
  resumeTitle: any;
  allResumeData: any = {};
  resumeFormGroup: FormGroup | any;

  FormArray: any;

  // receivedTemplateData: any;
  getLocalResumeData: any;

  constructor(
    public commonService: CommonServicesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    // formatLabel(value: number): any {
    //   if (value >= 100) {
    //     return Math.round(value / 1000);
    //   }
    //   return `${value}`;
    // }
  }

  get educationalDetails(): FormArray {
    return this.resumeFormGroup.get('educationalDetails') as FormArray;
  }

  get experienceDetails(): FormArray {
    return this.resumeFormGroup.get('experienceDetails') as FormArray;
  }

  get skillDetails(): FormArray {
    return this.resumeFormGroup.get('skillDetails') as FormArray;
  }

  get languageDetails(): FormArray {
    return this.resumeFormGroup.get('languageDetails') as FormArray;
  }

  get projectDetails(): FormArray {
    return this.resumeFormGroup.get('projectDetails') as FormArray;
  }

  get hobbyDetails(): FormArray {
    return this.resumeFormGroup.get('hobbyDetails') as FormArray;
  }

  ngOnInit() {
    this.getLocalResumeData = this.commonService.getLocalStorage(
      'setLocalResumeFormData'
    );
    console.log('this.getLocalResumeData === ', this.getLocalResumeData);
    if (this.getLocalResumeData != null) {
      this.resumeFormGroup = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: [
            this.getLocalResumeData.formBuilder.personalDetails.firstName,
            Validators.required,
          ],
          lastName: [
            this.getLocalResumeData.formBuilder.personalDetails.lastName,
            Validators.required,
          ],
          jobTitle: [
            this.getLocalResumeData.formBuilder.personalDetails.jobTitle,
            Validators.required,
          ],
          email: [
            this.getLocalResumeData.formBuilder.personalDetails.email,
            Validators.required,
            [this.asyncEmailValidator],
          ],
          phone: [
            this.getLocalResumeData.formBuilder.personalDetails.phone,
            Validators.required,
          ],
          birthDate: [
            this.getLocalResumeData.formBuilder.personalDetails.birthDate,
            Validators.required,
          ],
          address: [
            this.getLocalResumeData.formBuilder.personalDetails.address,
            Validators.required,
          ],
          city: [
            this.getLocalResumeData.formBuilder.personalDetails.city,
            Validators.required,
          ],
          state: [
            this.getLocalResumeData.formBuilder.personalDetails.state,
            Validators.required,
          ],
          postalCode: [
            this.getLocalResumeData.formBuilder.personalDetails.postalCode,
            Validators.required,
          ],
          country: [
            this.getLocalResumeData.formBuilder.personalDetails.country,
            Validators.required,
          ],
          website: [
            this.getLocalResumeData.formBuilder.personalDetails.website,
          ],
          description: [
            this.getLocalResumeData.formBuilder.personalDetails.description,
          ],
        }),
        educationalDetails: this.formBuilder.array(
          this.getLocalResumeData.formBuilder.educationalDetails.map(
            (eduItem: any) => {
              return this.createdEduDetailsFormGroup(eduItem);
            }
          )
        ),
        experienceDetails: this.formBuilder.array([
          this.createdExpDetailsFormGroup(),
        ]),
        skillDetails: this.formBuilder.array([this.createdSkillFormGroup()]),
        languageDetails: this.formBuilder.array([
          this.createdLanguageFormGroup(),
        ]),
        projectDetails: this.formBuilder.array([
          this.createdProjectFormGroup(),
        ]),
        hobbyDetails: this.formBuilder.array([this.createdHobbyFormGroup()]),
      });
    } else {
      this.resumeFormGroup = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: ['Abc', Validators.required],
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
          this.createdEduDetailsFormGroup(null),
        ]),
        experienceDetails: this.formBuilder.array([
          this.createdExpDetailsFormGroup(),
        ]),
        skillDetails: this.formBuilder.array([this.createdSkillFormGroup()]),
        languageDetails: this.formBuilder.array([
          this.createdLanguageFormGroup(),
        ]),
        projectDetails: this.formBuilder.array([
          this.createdProjectFormGroup(),
        ]),
        hobbyDetails: this.formBuilder.array([this.createdHobbyFormGroup()]),
      });
    }
  }

  ngAfterViewInit() {
    // console.log('this.getLocalResumeData === ', this.getLocalResumeData);
  }

  // education-section
  createdEduDetailsFormGroup(eduData: any): FormGroup {
    return this.formBuilder.group({
      institutionName: [eduData.institutionName || '', Validators.required],
      studyField: [eduData.studyField || '', Validators.required],
      degree: [eduData.degree || '', Validators.required],
      startDate: [eduData.startDate || '', Validators.required],
      endDate: [eduData.endDate || '', Validators.required],
      city: [eduData.city || ''],
      grade: [eduData.grade || '', Validators.required],
      description: [eduData.description || '', Validators.required],
    });
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

  //skill-section
  createdSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      skillName: ['', Validators.required],
      skillValue: [''],
    });
  }

  //Language-section
  createdLanguageFormGroup(): FormGroup {
    return this.formBuilder.group({
      languageName: [''],
      languageValue: [''],
    });
  }

  //Hobby-section
  createdHobbyFormGroup(): FormGroup {
    return this.formBuilder.group({
      hobby: [''],
    });
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
      | 'hobbyDetails'
  ): void {
    const details = this.resumeFormGroup.get(type) as FormArray;
    if (type === 'educationalDetails') {
      details.push(this.createdEduDetailsFormGroup(''));
    } else if (type === 'experienceDetails') {
      details.push(this.createdExpDetailsFormGroup());
    } else if (type === 'skillDetails') {
      details.push(this.createdSkillFormGroup());
    } else if (type === 'projectDetails') {
      details.push(this.createdProjectFormGroup());
    } else if (type === 'languageDetails') {
      details.push(this.createdLanguageFormGroup());
    } else if (type === 'hobbyDetails') {
      details.push(this.createdHobbyFormGroup());
    }
  }

  deleteDetails(
    type:
      | 'educationalDetails'
      | 'experienceDetails'
      | 'skillDetails'
      | 'projectDetails'
      | 'languageDetails'
      | 'hobbyDetails',
    i: number
  ): void {
    const details = this.resumeFormGroup.get(type) as FormArray;
    details.removeAt(i);
  }

  submitResumeForm() {
    if (this.resumeFormGroup.valid) {
      this.allResumeData = {};
      this.allResumeData = {
        formBuilder: this.resumeFormGroup.value,
        title: this.resumeTitle,
      };
      this.commonService.setLocalStorage(
        'setLocalResumeFormData',
        this.allResumeData
      );
      console.log('firstFormGroup data here', this.allResumeData);
    } else {
      console.log('firstFormGroup not have valid enteries');
    }
  }

  viewResume() {
    let Storage = this.commonService.getLocalStorage('selectedTempData');
    console.log('Storage === ', Storage);
    console.log('this.allResumeData === ', this.allResumeData);
    if (this.getLocalResumeData) this.allResumeData = this.getLocalResumeData;
    if (
      typeof Storage !== 'undefined' &&
      typeof this.allResumeData == 'object' &&
      Object.keys(this.allResumeData).length > 0
    ) {
      this.dialog.open(ViewTemplateComponent, {
        backdropClass: 'backdrop-blur',
        width: '1024px',
        height: '80vh',
        panelClass: 'rounded-md',
        data: {
          receivedTemplateData:
            this.commonService.getLocalStorage('selectedTempData'),
          resumeData: this.allResumeData,
        },
      });
    } else {
      console.log('Local storage is not available.');
      this.dialog.open(DialogBoxComponent, {
        backdropClass: 'backdrop-blur',
        width: '400px',
        height: 'auto',
        panelClass: 'rounded-lg',
      });
    }
  }
}
