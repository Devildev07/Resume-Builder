import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { CommonServicesService } from '../common-services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUsersignin: boolean = false;
  userDataFromFirebase: any = {};
  userEmail: any = '';
  userPass: any = '';
  userExists: boolean = false;

  private firestore: Firestore = inject(Firestore);

  constructor(public commonService: CommonServicesService) {
    // if (commonService.getLocalStorage('userData')) {
    //   this.getCurrentUser(commonService.getLocalStorage('userData'));
    // }
  }

  // auth-functionality starts here
  // registerUser
  async registerUser(userData: any): Promise<boolean> {
    await this.getCurrentUser(userData);

    if (this.userEmail === userData.email) {
      this.userExists = true;
      console.log('User already exists');

      return false;
    } else {
      const randomId = '_Id' + Math.random().toString(36).substring(2);
      // console.log('randomId', randomId);

      const collectionInstance = collection(this.firestore, 'users');
      const docRef = await addDoc(collectionInstance, {
        ...userData,
        Id: randomId,
        profileImage: {},
        resumeFormImage: {},
        selectedTempData: {},
        selectedTemplateArray: {},
        setLocalProfileData: {},
        setLocalResumeFormData: {},
      });
      this.isUsersignin = true;
      this.commonService.setLocalStorage('isUsersignin', this.isUsersignin);

      console.log('User registered successfully!', docRef.id);

      return true;
    }
  }

  // signinUser
  async signinUser(userData: any) {
    try {
      await this.getCurrentUser(userData);
      console.log(
        'userData  this.userEmail, this.userPass',
        userData,
        this.userEmail,
        this.userPass
      );

      if (
        this.userEmail === userData.email &&
        this.userPass === userData.password
      ) {
        this.isUsersignin = true;
        this.commonService.setLocalStorage('isUsersignin', this.isUsersignin);
        console.log('isUsersignin', this.isUsersignin);
      } else {
        this.isUsersignin = false;
        this.commonService.setLocalStorage('isUsersignin', this.isUsersignin);
        console.log('isUsersignin', this.isUsersignin);
      }

      return true;
    } catch (error) {
      console.log('catch error', error);
      return null;
    }
  }

  // signout
  async signOutUser() {
    this.isUsersignin = false;
    this.commonService.setLocalStorage('isUsersignin', this.isUsersignin);
    // this.commonService.removeLocalStorage('selectedTempData');
    // this.commonService.removeLocalStorage('selectedTemplateArray');
    // this.commonService.removeLocalStorage('setLocalResumeFormData');
    // this.commonService.removeLocalStorage('resumeFormImage');
    // this.commonService.removeLocalStorage('setLocalProfileData');
    // this.commonService.removeLocalStorage('profileImage');
    this.commonService.setLocalStorage('userEmail', '');
    // console.log('isUsersignin', this.isUsersignin);
  }

  // get current user
  async getCurrentUser(userData: any) {
    const collectionRef = collection(this.firestore, 'users');
    const q = query(collectionRef, where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null;
    } else {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        this.userEmail = doc.data()['email'];
        this.userPass = doc.data()['password'];
        this.setUser(doc.data(), doc.id);
      });
      return querySnapshot.docs;
    }
  }

  async setUser(userData: any, docId: any) {
    this.userDataFromFirebase = await { userData, docId };
    // console.log('userDataFromFirebase', this.userDataFromFirebase);
  }

  async getUser() {
    const userData = this.commonService.getLocalStorage('userEmail');
    if (userData) {
      await this.getCurrentUser(userData);
      console.log('userDataFromFirebase', this.userDataFromFirebase);
      return this.userDataFromFirebase;
    }
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
      console.log(
        `Field "${keyToUpdate}" in document "${documentId}" successfully updated to "${newValue}"`
      );
    } catch (error) {
      console.error('Error updating document field: ', error);
    }
  }

  //encrypt password
  encryptPass(getPass: string) {
    var passA = btoa(getPass);
    var passB = btoa('devil');
    var generatedPass = passA + '@$98#%' + passB;
    // console.log('generatedPass', generatedPass);
    return generatedPass;
  }

  checkAuthStatus() {
    this.isUsersignin = this.commonService.getLocalStorage('isUsersignin');
    // console.log('isUsersignin', this.isUsersignin);
  }

  autoLogout() {
    setTimeout(() => {
      this.signOutUser();
    }, 21600000);
  }

  // auth-functionality ends here

  // dataMerge
  // async uploadDatatoFirebase(userData: any) {
  //   const userDocs = await this.getCurrentUser(userData);
  //   if (userDocs && userDocs.length > 0) {
  //     const userId = userDocs[0].id; // Assuming there's only one document per user

  //     const dataToUpload = {
  //       selectedTempData:
  //         this.commonService.getLocalStorage('selectedTempData'),
  //       selectedTemplateArray: this.commonService.getLocalStorage(
  //         'selectedTemplateArray'
  //       ),
  //       setLocalResumeFormData: this.commonService.getLocalStorage(
  //         'setLocalResumeFormData'
  //       ),
  //       resumeFormImage: this.commonService.getLocalStorage('resumeFormImage'),
  //       setLocalProfileData: this.commonService.getLocalStorage(
  //         'setLocalProfileData'
  //       ),
  //       profileImage: this.commonService.getLocalStorage('profileImage'),
  //     };

  //     await setDoc(doc(this.firestore, 'users', userId), dataToUpload, {
  //       merge: true,
  //     });
  //   } else {
  //     console.log('User not found');
  //   }
  // }
}
