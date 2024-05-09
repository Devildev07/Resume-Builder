import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDatepickerModule, FormsModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  tabs = ['Profile', 'Account Settings'];
  activeTab = 0;

  profileForm: any = {};
  allProfileData: any;
  getLocalResumeData: any;
  getLocalProfileData: any;

  constructor(
    public commonService: CommonServicesService,
    private formBuilder: FormBuilder
  ) {}
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
        }),
      });
    } else {
      this.profileForm = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          jobTitle: ['', Validators.required],
          email: ['', Validators.required, [this.commonService.asyncEmailValidator]],
          phone: ['', Validators.required],
          birthDate: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          postalCode: ['', Validators.required],
          country: ['', Validators.required],
          website: [''],
          nationality: ['', Validators.required],
        }),
      });
    }
  }

  extractDate(dateTimeString: string): string {
    return dateTimeString ? dateTimeString.split('T')[0] : '';
  }

  // asyncEmailValidator(
  //   control: AbstractControl
  // ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   return new Observable((observer) => {
  //     // Simulate asynchronous validation
  //     setTimeout(() => {
  //       if (
  //         control.value &&
  //         !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value)
  //       ) {
  //         observer.next({ invalidEmail: true });
  //       } else {
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }, 1000);
  //   });
  // }

  submitProfileForm() {
    if (this.profileForm.valid) {
      this.allProfileData = {};
      this.allProfileData = {
        formBuilder: this.profileForm.value,
      };
      this.commonService.setLocalStorage(
        'setLocalProfileData',
        this.allProfileData
      );
      console.log('firstFormGroup data here', this.allProfileData);
    } else {
      console.log('firstFormGroup not have valid enteries');
    }
  }
}
