import { Component, OnInit, inject } from '@angular/core';
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
import * as moment from 'moment';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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
  getResumeData: any;
  getProfileData: any;

  userDocs: any = {};
  accountId: any;
  accountEmail: any;
  numberOfTemplates: any;

  countdown?: string;
  timerInterval: any;

  private firestore: Firestore = inject(Firestore);

  constructor(
    public commonService: CommonServicesService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    public router: Router
  ) {
    try {
      // this.authService.initializeUserData();

      this.userDocs = this.authService.userData;
      // console.log('User Docs:', this.userDocs);
      this.accountEmail = this.userDocs?.userData?.email
        ? this.userDocs?.userData?.email
        : 'Your Account Email';
      this.accountId = this.userDocs?.userData?.Id
        ? this.userDocs?.userData?.Id
        : 'Your Account Id';
      this.numberOfTemplates = this.userDocs?.userData?.selectedTemplateArray
        .length
        ? this.userDocs?.userData?.selectedTemplateArray.length
        : 'Number of Templates you used';

      this.getResumeData = this.userDocs.userData.setResumeFormData;
      this.getProfileData = this.userDocs.userData.setProfileData;
      // console.log('this.getResumeData === ', this.getResumeData);
    } catch (error) {
      console.error('Error fetching user docs:', error);
    }
  }

  ngOnInit(): void {
    if (
      this.getProfileData != null &&
      Object.keys(this.getProfileData).length > 0
    ) {
      this.profileForm = this.formBuilder.group({
        personalDetails: this.formBuilder.group({
          firstName: [
            this.getProfileData.formBuilder.personalDetails.firstName,
            Validators.required,
          ],
          lastName: [
            this.getProfileData.formBuilder.personalDetails.lastName,
            Validators.required,
          ],
          jobTitle: [
            this.getProfileData.formBuilder.personalDetails.jobTitle,
            Validators.required,
          ],
          email: [
            this.getProfileData.formBuilder.personalDetails.email,
            Validators.required,
            [this.commonService.asyncEmailValidator],
          ],
          phone: [
            this.getProfileData.formBuilder.personalDetails.phone,
            Validators.required,
          ],
          birthDate: [
            this.extractDate(
              this.getProfileData.formBuilder.personalDetails.birthDate
            ),
            Validators.required,
          ],
          address: [
            this.getProfileData.formBuilder.personalDetails.address,
            Validators.required,
          ],
          city: [
            this.getProfileData.formBuilder.personalDetails.city,
            Validators.required,
          ],
          postalCode: [
            this.getProfileData.formBuilder.personalDetails.postalCode,
            Validators.required,
          ],
          country: [
            this.getProfileData.formBuilder.personalDetails.country,
            Validators.required,
          ],
          website: [this.getProfileData.formBuilder.personalDetails.website],
          nationality: [
            this.getProfileData.formBuilder.personalDetails.nationality,
            Validators.required,
          ],
          // userImg: [
          //   this.getProfileData.formBuilder.personalDetails.userImg,
          // ],
        }),
      });
    } else if (
      typeof this.getProfileData == 'object' &&
      this.getResumeData != null &&
      Object.keys(this.getResumeData).length > 0 &&
      Object.keys(this.getProfileData).length == 0
    ) {
      this.profileForm = this.formBuilder.group({
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
          postalCode: [
            this.getResumeData.formBuilder.personalDetails.postalCode,
            Validators.required,
          ],
          country: [
            this.getResumeData.formBuilder.personalDetails.country,
            Validators.required,
          ],
          website: [this.getResumeData.formBuilder.personalDetails.website],
          nationality: [
            this.getResumeData.formBuilder.personalDetails.nationality,
            Validators.required,
          ],
          // userImg: [
          //   this.getResumeData.formBuilder.personalDetails.userImg,
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

  // extractDate(dateTimeString: string): string {
  //   return dateTimeString ? dateTimeString.split('T')[0] : '';
  // }

  extractDate(dateTimeString: string): string {
    return dateTimeString ? moment(dateTimeString).format('YYYY-MM-DD') : '';
  }

  async submitProfileForm() {
    if (this.profileForm.valid) {
      this.allProfileData = {};
      // await this.authService.initializeUserData();

      try {
        await this.commonService.uploadFile();

        this.allProfileData = {
          formBuilder: this.profileForm.value,
        };

        let userDocId = this.commonService.getLocalStorage('userDocId');
        console.log('userDocId', userDocId);

        this.commonService.updateDocumentField(
          userDocId,
          'setProfileData',
          this.allProfileData
        );

        // console.log('firstFormGroup data here', this.allProfileData);
        await this.authService.initializeUserData();

        this.commonService.userProfileImage =
          this.authService.userData.userData.profileImage.base64Image;
      } catch (error) {}
    } else {
      // console.log('firstFormGroup not have valid enteries');
    }
  }

  // private startCountdown() {
  //   const targetDate = new Date();
  //   targetDate.setDate(targetDate.getDate() + 1);

  //   this.timerInterval = setInterval(() => {
  //     const now = new Date();
  //     const difference = targetDate.getTime() - now.getTime();

  //     if (difference <= 0) {
  //       this.daleteDoc();
  //       clearInterval(this.timerInterval);
  //       this.countdown = 'Data deleted';
  //     } else {
  //       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor(
  //         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       );
  //       const minutes = Math.floor(
  //         (difference % (1000 * 60 * 60)) / (1000 * 60)
  //       );
  //       const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  //       this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  //       console.log('countdown', this.countdown);
  //     }
  //   }, 1000);
  // }

  async startCountdown() {
    const targetDate = new Date();
    targetDate.setMinutes(targetDate.getMinutes() + 15);

    this.timerInterval = setInterval(async () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        await this.deleteDoc();
        this.authService.signOutUser();
        clearInterval(this.timerInterval);
        this.countdown = 'Data deleted';
      } else {
        const minutes = Math.floor(difference / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        this.countdown = `${minutes}m ${seconds}s`;
        // console.log('countdown', this.countdown);
      }
    }, 1000);
  }

  deleteDoc() {
    const docId = this.commonService.getLocalStorage('userDocId');
    const docInstance = doc(this.firestore, 'users', docId);
    console.log('Document successfully deleted');
    deleteDoc(docInstance)
      .then(() => {
        console.log('Document successfully deleted');
      })
      .catch((err) => {
        console.log('Error deleting document:', err);
      });
  }

  stopCountdown() {
    clearInterval(this.timerInterval);
    this.countdown = '';
  }
}
