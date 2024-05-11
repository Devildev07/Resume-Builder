import {Injectable, OnInit} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DialogBoxComponent} from "../modals/dialog-box/dialog-box.component";
import {MatDialog} from "@angular/material/dialog";


@Injectable({
  providedIn: 'root',
})
export class CommonServicesService implements OnInit {
  // canShowModal: boolean = false;
  superAdmin = 'Dewanshu';
  currentUrl?: string;
  selectedTemplateArray: any[] = [];
  userProfileImage: any;
  userResumeProfileImage: any;

  selectedFile: File | null | any = null;
  imageUrl: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;

  constructor(
    public router: Router,
    public dialog: MatDialog,
  ) {
    this.getCurrentUrl();
    this.profilePicUpdate()
  }

  ngOnInit() {
    this.profilePicUpdate()

  }

  // localStorage
  setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(key: string): any {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue ? JSON.parse(localStorageValue) : null;
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }


  getCurrentUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log('Current URL:', this.currentUrl);
      }
    });
  }

  asyncEmailValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Observable((observer) => {
      // Simulate asynchronous validation
      setTimeout(() => {
        if (
          control.value &&
          !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value)
        ) {
          observer.next({invalidEmail: true});
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  profilePicUpdate() {
    if (this.getLocalStorage('resumeFormImage')) {
      this.userResumeProfileImage = this.getLocalStorage('resumeFormImage').base64Image
      // console.log("userResumeProfileImage", this.userResumeProfileImage)
    }
    if (this.getLocalStorage('profileImage')) {
      this.userProfileImage = this.getLocalStorage('profileImage').base64Image
      // console.log("userProfileImage", this.userProfileImage)
    }
  }

  // file upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imageUrl = null;
    }
  }

  async uploadFile(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.selectedFile) {
        console.error('No file selected!');
        reject('No file selected!');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        this.uploadProgress = progress;
        if (progress === 100) {
          clearInterval(interval);

          const reader = new FileReader();
          reader.onload = () => {

            const base64String = reader.result as string;
            const imageObject = {
              base64Image: base64String,
              fileName: this.selectedFile.name,
              fileSize: this.selectedFile.size,
              fileType: this.selectedFile.type,
              uploadDate: new Date().toISOString(),
            };
            if (this.currentUrl === '/dashboard/builder') {
              localStorage.setItem('resumeFormImage', JSON.stringify(imageObject));
            } else if (this.currentUrl === '/dashboard/profile') {
              localStorage.setItem('profileImage', JSON.stringify(imageObject));
            }
            resolve();
          };
          reader.readAsDataURL(this.selectedFile);

          this.dialog.open(DialogBoxComponent, {
            backdropClass: 'backdrop-blur',
            width: '400px',
            height: 'auto',
            panelClass: 'rounded-lg',
            data: {
              dialogCss: 'success-dialog',
              message: 'File uploaded successfully!',
              buttonText: 'OK',
              buttonCss: 'success-dialog-btn',
            },
          });

          this.profilePicUpdate()

          console.log('File uploaded successfully!');
        }
      }, 200);
    });
  }


}

