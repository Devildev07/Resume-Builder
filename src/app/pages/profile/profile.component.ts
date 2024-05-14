import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDatepickerModule, FormsModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  tabs = ['Profile', 'Account Details'];
  activeTab = 0;

  profileForm: any = {};
  allProfileData: any;
  getLocalResumeData: any;
  getLocalProfileData: any;

  constructor(
    public commonService: CommonServicesService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
  ) {
    // this.authService.uploadDatatoFirebase(
    //   commonService.getLocalStorage('userData')
    // );
  }

  ngOnInit(): void {
    this.getLocalResumeData = this.commonService.getLocalStorage(
      'setLocalResumeFormData'
    );
    this.getLocalProfileData = this.commonService.getLocalStorage(
      'setLocalProfileData'
    );

    if (this.getLocalProfileData != null) {
      this.profileForm = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: [
            this.getLocalProfileData.formBuilder.personalDetails.firstName,
            Validators.required,
          ],
          lastName: [
            this.getLocalProfileData.formBuilder.personalDetails.lastName,
            Validators.required,
          ],
          jobTitle: [
            this.getLocalProfileData.formBuilder.personalDetails.jobTitle,
            Validators.required,
          ],
          email: [
            this.getLocalProfileData.formBuilder.personalDetails.email,
            Validators.required,
            [this.commonService.asyncEmailValidator],
          ],
          phone: [
            this.getLocalProfileData.formBuilder.personalDetails.phone,
            Validators.required,
          ],
          birthDate: [
            this.extractDate(
              this.getLocalProfileData.formBuilder.personalDetails.birthDate
            ),
            Validators.required,
          ],
          address: [
            this.getLocalProfileData.formBuilder.personalDetails.address,
            Validators.required,
          ],
          city: [
            this.getLocalProfileData.formBuilder.personalDetails.city,
            Validators.required,
          ],
          postalCode: [
            this.getLocalProfileData.formBuilder.personalDetails.postalCode,
            Validators.required,
          ],
          country: [
            this.getLocalProfileData.formBuilder.personalDetails.country,
            Validators.required,
          ],
          website: [
            this.getLocalProfileData.formBuilder.personalDetails.website,
          ],
          nationality: [
            this.getLocalProfileData.formBuilder.personalDetails.nationality,
            Validators.required,
          ],
          // userImg: [
          //   this.getLocalProfileData.formBuilder.personalDetails.userImg,
          // ],
        }),
      });
    } else if (
      this.getLocalProfileData == null &&
      this.getLocalResumeData != null
    ) {
      this.profileForm = this.formBuilder.group({
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
            [this.commonService.asyncEmailValidator],
          ],
          phone: [
            this.getLocalResumeData.formBuilder.personalDetails.phone,
            Validators.required,
          ],
          birthDate: [
            this.extractDate(
              this.getLocalResumeData.formBuilder.personalDetails.birthDate
            ),
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
          nationality: [
            this.getLocalResumeData.formBuilder.personalDetails.nationality,
            Validators.required,
          ],
          // userImg: [
          //   this.getLocalResumeData.formBuilder.personalDetails.userImg,
          // ],
        }),
      });
    } else {
      this.profileForm = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          jobTitle: [''],
          email: [
            '',
            Validators.required,
            [this.commonService.asyncEmailValidator],
          ],
          phone: ['', Validators.required],
          birthDate: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          postalCode: ['', Validators.required],
          country: ['', Validators.required],
          website: [''],
          nationality: ['', Validators.required],
          // userImg: [''],
        }),
      });
    }
  }

  extractDate(dateTimeString: string): string {
    return dateTimeString ? dateTimeString.split('T')[0] : '';
  }

  async submitProfileForm() {
    console.log('this.profileForm.value', this.profileForm.value);
    if (this.profileForm.valid) {
      this.allProfileData = {};
      try {
        await this.commonService.uploadFile();
        const base64Image = this.commonService.getLocalStorage('profileImage');
        this.allProfileData = {
          formBuilder: this.profileForm.value,
          profileImage: base64Image ? base64Image : '',
        };
        this.commonService.setLocalStorage(
          'setLocalProfileData',
          this.allProfileData
        );
        console.log('firstFormGroup data here', this.allProfileData);
      } catch (error) {}
    } else {
      console.log('firstFormGroup not have valid enteries');
    }
  }
}
