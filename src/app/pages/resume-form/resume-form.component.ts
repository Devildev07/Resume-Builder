import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormArray,
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewTemplateComponent } from 'src/app/modals/view-template/view-template.component';
import { DialogBoxComponent } from 'src/app/modals/dialog-box/dialog-box.component';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

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

  getResumeData: any;

  userDocs: any = {};

  constructor(
    public commonService: CommonServicesService,
    public authService: AuthServiceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    try {
      this.userDocs = this.authService.userData;
      console.log('User Docs:', this.userDocs);

      this.getResumeData = this.userDocs.userData.setResumeFormData;
      console.log('this.getResumeData === ', this.getResumeData);
    } catch (error) {
      console.error('Error fetching user docs:', error);
    }
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
    // this.getResumeData = this.commonService.getLocalStorage(
    //   'setLocalResumeFormData'
    // );
    // this.getResumeData = this.authService.userDataFromFirebase
    console.log('this.getResumeData === ', this.getResumeData);
    if (
      this.getResumeData != null &&
      Object.keys(this.getResumeData).length > 0
    ) {
      this.resumeTitle = this.getResumeData.title;
      this.resumeFormGroup = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: [
            this.getResumeData.formBuilder.personalDetails.firstName,
            Validators.required,
          ],
          lastName: [
            this.getResumeData.formBuilder.personalDetails.lastName,
            Validators.required,
          ],
          jobTitle: [
            this.getResumeData.formBuilder.personalDetails.jobTitle,
            Validators.required,
          ],
          email: [
            this.getResumeData.formBuilder.personalDetails.email,
            Validators.required,
            [this.commonService.asyncEmailValidator],
          ],
          phone: [
            this.getResumeData.formBuilder.personalDetails.phone,
            Validators.required,
          ],
          birthDate: [
            this.extractDate(
              this.getResumeData.formBuilder.personalDetails.birthDate
            ),
            Validators.required,
          ],
          address: [
            this.getResumeData.formBuilder.personalDetails.address,
            Validators.required,
          ],
          city: [
            this.getResumeData.formBuilder.personalDetails.city,
            Validators.required,
          ],
          state: [
            this.getResumeData.formBuilder.personalDetails.state,
            Validators.required,
          ],
          postalCode: [
            this.getResumeData.formBuilder.personalDetails.postalCode,
            Validators.required,
          ],
          country: [
            this.getResumeData.formBuilder.personalDetails.country,
            Validators.required,
          ],
          website: [this.getResumeData.formBuilder.personalDetails.website],
          description: [
            this.getResumeData.formBuilder.personalDetails.description,
          ],
        }),
        educationalDetails: this.formBuilder.array(
          this.getResumeData.formBuilder.educationalDetails.map(
            (eduItem: any) => {
              return this.createdEduDetailsFormGroup(eduItem);
            }
          )
        ),
        experienceDetails: this.formBuilder.array(
          this.getResumeData.formBuilder.experienceDetails.map(
            (expItem: any) => {
              return this.createdExpDetailsFormGroup(expItem);
            }
          )
        ),
        skillDetails: this.formBuilder.array(
          this.getResumeData.formBuilder.skillDetails.map((skillItem: any) => {
            return this.createdSkillFormGroup(skillItem);
          })
        ),
        languageDetails: this.formBuilder.array(
          this.getResumeData.formBuilder.languageDetails.map(
            (langItem: any) => {
              return this.createdLanguageFormGroup(langItem);
            }
          )
        ),
        projectDetails: this.formBuilder.array(
          this.getResumeData.formBuilder.projectDetails.map(
            (projectItem: any) => {
              return this.createdProjectFormGroup(projectItem);
            }
          )
        ),
        hobbyDetails: this.formBuilder.array(
          this.getResumeData.formBuilder.hobbyDetails.map((hobbyItem: any) => {
            return this.createdHobbyFormGroup(hobbyItem);
          })
        ),
      });
    } else {
      this.resumeFormGroup = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          jobTitle: ['', Validators.required],
          email: [
            '',
            Validators.required,
            [this.commonService.asyncEmailValidator],
          ],
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
          this.createdEduDetailsFormGroup({}),
        ]),
        experienceDetails: this.formBuilder.array([
          this.createdExpDetailsFormGroup({}),
        ]),
        skillDetails: this.formBuilder.array([this.createdSkillFormGroup({})]),
        languageDetails: this.formBuilder.array([
          this.createdLanguageFormGroup({}),
        ]),
        projectDetails: this.formBuilder.array([
          this.createdProjectFormGroup({}),
        ]),
        hobbyDetails: this.formBuilder.array([this.createdHobbyFormGroup({})]),
      });
    }
  }

  ngAfterViewInit() {
    // console.log('this.getResumeData === ', this.getResumeData);
  }

  // education-section
  createdEduDetailsFormGroup(eduData: any): FormGroup {
    return this.formBuilder.group({
      institutionName: [eduData.institutionName || '', Validators.required],
      studyField: [eduData.studyField || '', Validators.required],
      degree: [eduData.degree || '', Validators.required],
      startDate: [
        this.extractDate(eduData.startDate) || '',
        Validators.required,
      ],
      endDate: [this.extractDate(eduData.endDate) || '', Validators.required],
      city: [eduData.city || ''],
      grades: [eduData.grades || '', Validators.required],
      description: [eduData.description || '', Validators.required],
    });
  }

  // experience-section
  createdExpDetailsFormGroup(expData: any): FormGroup {
    return this.formBuilder.group({
      jobTitle: [expData.jobTitle || '', Validators.required],
      companyName: [expData.companyName || '', Validators.required],
      city: [expData.city || '', Validators.required],
      startDate: [
        this.extractDate(expData.startDate) || '',
        Validators.required,
      ],
      endDate: [this.extractDate(expData.endDate) || '', Validators.required],
      experienceYear: [expData.experienceYear || ''],
      description: [expData.description || ''],
    });
  }

  //skill-section
  createdSkillFormGroup(skillData: any): FormGroup {
    return this.formBuilder.group({
      skillName: [skillData.skillName || '', Validators.required],
      skillValue: [skillData.skillValue || '0'],
    });
  }

  //Language-section
  createdLanguageFormGroup(langData: any): FormGroup {
    return this.formBuilder.group({
      languageName: [langData.languageName || ''],
      languageValue: [langData.languageValue || '0'],
    });
  }

  //Hobby-section
  createdHobbyFormGroup(hobbyData: any): FormGroup {
    return this.formBuilder.group({
      hobby: [hobbyData.hobby || ''],
    });
  }

  //project-section
  createdProjectFormGroup(projectData: any): FormGroup {
    return this.formBuilder.group({
      projectTitle: [projectData.projectTitle || '', Validators.required],
      projectLink: [projectData.projectLink || '', Validators.required],
      projectCodeLink: [projectData.projectCodeLink || ''],
      projectTechUsed: [projectData.projectTechUsed || ''],
      projectYear: [projectData.projectYear || ''],
      projectDescription: [projectData.projectDescription || ''],
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
      details.push(this.createdEduDetailsFormGroup({}));
    } else if (type === 'experienceDetails') {
      details.push(this.createdExpDetailsFormGroup({}));
    } else if (type === 'skillDetails') {
      details.push(this.createdSkillFormGroup({}));
    } else if (type === 'projectDetails') {
      details.push(this.createdProjectFormGroup({}));
    } else if (type === 'languageDetails') {
      details.push(this.createdLanguageFormGroup({}));
    } else if (type === 'hobbyDetails') {
      details.push(this.createdHobbyFormGroup({}));
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

  async submitResumeForm() {
    if (this.resumeFormGroup.valid) {
      this.allResumeData = {};
      await this.authService.initializeUserData();
      try {
        await this.commonService.uploadFile();
        const base64Image = this.authService.userData.userData.resumeFormImage;
        console.log('base64Image', base64Image);

        // const base64Image =
        //   this.commonService.getLocalStorage('resumeFormImage');

        this.allResumeData = {
          formBuilder: this.resumeFormGroup.value,
          title: this.resumeTitle ? this.resumeTitle : 'My Resume',
          profileImage: base64Image ? base64Image : '',
        };

        console.log('this.allResumeData', this.allResumeData);

        let userDocId = this.commonService.getLocalStorage('userDocId');
        console.log('userDocId', userDocId);

        this.commonService.updateDocumentField(
          userDocId,
          'setResumeFormData',
          this.allResumeData
        );

        // this.commonService.setLocalStorage(
        //   'setLocalResumeFormData',
        //   this.allResumeData
        // );
        console.log('firstFormGroup data here', this.allResumeData);
      } catch (error) {
        console.error('Error during file upload:', error);
      }
    } else {
      console.log('firstFormGroup not have valid enteries');
    }
  }

  viewResume() {
    let Storage = this.commonService.getLocalStorage('selectedTempData');
    console.log('Storage === ', Storage);
    console.log('this.allResumeData === ', this.allResumeData);
    if (this.getResumeData) this.allResumeData = this.getResumeData;
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
        data: {
          title: 'Form details required',
          dialogCss: 'danger-dialog',
          message: 'Please fill the form to view the resume.',
          buttonText: 'OK',
          buttonCss: 'danger-dialog-btn',
        },
      });
    }
  }

  extractDate(dateTimeString: string): string {
    return dateTimeString ? moment(dateTimeString).format('YYYY-MM-DD') : '';
  }

  getSkillValue(index: number): number {
    return this.skillDetails.at(index).get('skillValue')?.value;
  }

  getLanguageValue(index: number): number {
    return this.languageDetails.at(index).get('languageValue')?.value;
  }
}
