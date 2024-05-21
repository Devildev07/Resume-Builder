import { Injectable, OnInit, inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogBoxComponent } from '../modals/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  getDownloadURL,
  uploadBytes,
} from '@angular/fire/storage';
import { AuthServiceService } from './auth/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonServicesService implements OnInit {
  // canShowModal: boolean = false;
  superAdmin = '';
  currentUrl?: string;
  selectedTemplateArray: any[] = [];

  userResumeProfileImage: any;
  userResumeProfileImgName: any;
  userResumeProfileImgSize: any;

  userProfileImage: any;
  userProfileImgName: any;
  userProfileImgSize: any;

  selectedFile: File | null | any = null;
  imageUrl: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;

  cloudImageUrl: any = '';

  private firestore: Firestore = inject(Firestore);
  private storage = inject(Storage);

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public authService: AuthServiceService,
    private _snackBar: MatSnackBar
  ) {
    this.getCurrentUrl();
    this.profilePicUpdate();
    this.authService.initializeUserData();
    this.superAdmin = this.authService.userData.userData.setProfileData
      .formBuilder.personalDetails.firstName
      ? this.authService.userData.userData.setProfileData.formBuilder
          .personalDetails.firstName
      : 'Your Name';
    // console.log(this.superAdmin);
  }

  async ngOnInit() {
    this.profilePicUpdate();
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
          observer.next({ invalidEmail: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  async profilePicUpdate() {
    if (this.authService.userData) {
      let resumePicData = await this.authService.userData.userData
        .resumeProfileImage;
      let profilePicData = await this.authService.userData.userData
        .profileImage;
      if (resumePicData) {
        this.userResumeProfileImage = resumePicData.base64Image;
        this.userResumeProfileImgName = resumePicData.fileName;
        this.userResumeProfileImgSize = Math.round(
          resumePicData.fileSize / 1024
        );
        // console.log("userResumeProfileImage", this.userResumeProfileImage)
      }
      if (profilePicData) {
        if (this.cloudImageUrl != '') {
          this.userProfileImage = this.cloudImageUrl;
        } else {
          this.userProfileImage = profilePicData.base64Image;
        }
        this.userProfileImgName = profilePicData.fileName;
        this.userProfileImgSize = Math.round(profilePicData.fileSize / 1024);
        // console.log("userProfileImage", this.userProfileImage)
      }
    }
  }

  // file upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        // console.log("this.imageUrl", this.imageUrl)
      };
      reader.readAsDataURL(this.selectedFile);
      // console.log("reader.readAsDataURL(this.selectedFile)", this.selectedFile)
    } else {
      this.imageUrl = null;
    }
  }

  async uploadFile(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.selectedFile) {
        let userImage: any;
        if (this.currentUrl === '/dashboard/builder') {
          // userImage = JSON.parse(
          //   localStorage.getItem('resumeFormImage') || '{}'
          // );
          userImage =
            this.authService.userData.userData.resumeFormImage || '{}';
        } else if (this.currentUrl === '/dashboard/profile') {
          userImage = this.authService.userData.userData.profileImage || '{}';
        }
        if (userImage && userImage.base64Image) {
          this.selectedFile = this.dataURItoBlob(userImage.base64Image);
        } else {
          this.openSnackBar('Please select a file to upload.', 'OK');

          reject('No file selected!');
          return;
        }
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      let progress = 0;
      const interval = setInterval(async () => {
        progress += 10;
        this.uploadProgress = progress;
        if (progress === 100) {
          clearInterval(interval);

          const reader = new FileReader();
          reader.onload = async () => {
            const base64String = reader.result as string;
            const imageObject = {
              base64Image: base64String,
              fileName: this.selectedFile.name,
              fileSize: this.selectedFile.size,
              fileType: this.selectedFile.type,
              uploadDate: new Date().toISOString(),
            };

            const userDocId = this.getLocalStorage('userDocId');
            // console.log('userDocId', userDocId);

            if (this.currentUrl === '/dashboard/builder') {
              this.userResumeProfileImage = imageObject.base64Image;
              this.userResumeProfileImgName = imageObject.fileName;
              this.userResumeProfileImgSize = Math.round(
                imageObject.fileSize / 1024
              );

              const imgfolderRef = ref(
                this.storage,
                'users/' +
                  userDocId +
                  '/' +
                  'ResumeImage' +
                  '/' +
                  this.selectedFile.name
              );

              await uploadBytes(imgfolderRef, this.selectedFile)
                .then((snapshot) => {
                  getDownloadURL(imgfolderRef).then((url) => {
                    imageObject.base64Image = url;

                    this.updateDocumentField(
                      userDocId,
                      'resumeProfileImage',
                      imageObject
                    );
                    // console.log('Complete URL:', url);
                    this.cloudImageUrl = url;
                    this.authService.initializeUserData();
                    this.profilePicUpdate();
                    return url;
                  });
                })
                .catch((error) => {
                  console.error(' Error uploading file:', error);
                });
            } else if (this.currentUrl === '/dashboard/profile') {
              this.userProfileImage = imageObject.base64Image;
              this.userProfileImgName = imageObject.fileName;
              this.userProfileImgSize = Math.round(imageObject.fileSize / 1024);

              const imgfolderRef = ref(
                this.storage,
                'users/' +
                  userDocId +
                  '/' +
                  'ProfileImage' +
                  '/' +
                  this.selectedFile.name
              );

              await uploadBytes(imgfolderRef, this.selectedFile)
                .then((snapshot) => {
                  getDownloadURL(imgfolderRef).then((url) => {
                    imageObject.base64Image = url;
                    this.updateDocumentField(
                      userDocId,
                      'profileImage',
                      imageObject
                    );
                    // console.log('Complete URL:', url);
                    this.cloudImageUrl = url;
                    this.authService.initializeUserData();
                    this.profilePicUpdate();
                    return url;
                  });
                })
                .catch((error) => {
                  console.error(' Error uploading file:', error);
                });
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
              title: 'File Upload',
              dialogCss: 'success-dialog',
              message: 'File uploaded successfully!',
              buttonText: 'OK',
              buttonCss: 'success-dialog-btn',
            },
          });

          // console.log('File uploaded successfully!');
        }
      }, 200);
    });
  }

  // Utility function to convert data URI to Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  async updateDocumentField(
    documentId: string,
    keyToUpdate: string,
    newValue: any
  ) {
    try {
      const docRef = doc(this.firestore, 'users', documentId);
      await updateDoc(docRef, {
        [keyToUpdate]: newValue,
      });
      // console.log(
      //   `Field "${keyToUpdate}" in document "${documentId}" successfully updated to "${Object.keys(
      //     newValue
      //   )}"`
      // );
    } catch (error) {
      console.error('Error updating document field: ', error);
    }
  }

  //toast
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
