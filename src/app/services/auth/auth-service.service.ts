import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUsersignin: boolean = false;
  userDataFromFirebase: any = {};
  userEmail: any = '';
  userPass: any = '';
  userExists: boolean = false;

  userData: any = {};

  private firestore: Firestore = inject(Firestore);

  constructor(public router : Router) {}

  // auth-functionality starts here
  // registerUser
  async registerUser(userData: any): Promise<boolean> {
    // await this.getCurrentUser(userData);

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
        resumeProfileImage: {},
        selectedTemplateArray: {},
        setProfileData: {},
        setResumeFormData: {},
        // selectedTempData: {},
      });
      this.isUsersignin = true;
      localStorage.setItem('isUsersignin', JSON.stringify(this.isUsersignin));
      localStorage.setItem('userDocId', docRef.id);
      await this.getCurrentUser(userData);
      // this.initializeUserData();

      console.log('User registered successfully!', docRef.id);

      return true;
    }
  }

  // signinUser
  async signinUser(userData: any) {
    try {
      await this.getCurrentUser(userData);
      // console.log(
      //   'userData  this.userEmail, this.userPass',
      //   userData,
      //   this.userEmail,
      //   this.userPass
      // );

      if (
        this.userEmail === userData.email &&
        this.userPass === userData.password
      ) {
        this.isUsersignin = true;
        localStorage.setItem('isUsersignin', JSON.stringify(this.isUsersignin));

        // console.log('isUsersignin', this.isUsersignin);
        await this.initializeUserData();
      } else {
        this.isUsersignin = false;
        localStorage.setItem('isUsersignin', JSON.stringify(this.isUsersignin));

        // console.log('isUsersignin', this.isUsersignin);
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

    localStorage.removeItem('userEmail');
    localStorage.removeItem('isUsersignin');
    localStorage.removeItem('userDocId');
    localStorage.removeItem('selectedTempData');
    this.router.navigate(['/home']);
  }

  // get current user
  async getCurrentUser(userData: any) {
    const collectionRef = collection(this.firestore, 'users');
    const q = query(collectionRef, where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);
    // console.log('this.getCurrentUser', userData.email);

    if (querySnapshot.empty) {
      // console.log('No matching documents.');
      return null;
    } else {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        this.userEmail = doc.data()['email'];
        this.userPass = doc.data()['password'];
        this.setUser(doc.data(), doc.id);
        localStorage.setItem('userDocId', JSON.stringify(doc.id));
      });
      return querySnapshot.docs;
    }
  }

  async setUser(userData: any, docId: any) {
    this.userDataFromFirebase = await { userData, docId };
    // console.log('userDataFromFirebase', this.userDataFromFirebase);
  }

  async getUser(): Promise<any> {
    const localStorageValue: any = localStorage.getItem('userEmail');
    if (!localStorageValue) {
      // console.log('No user data found in local storage.');
      return null;
    } else {
      const userData = JSON.parse(localStorageValue);
      // console.log('userData1', userData1, userData);

      if (userData) {
        await this.getCurrentUser(userData);
        // console.log('userDataFromFirebase', this.userDataFromFirebase);
        return this.userDataFromFirebase;
      }
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
      // console.log(
      //   `Field "${keyToUpdate}" in document "${documentId}" successfully updated to "${Object.keys(
      //     newValue
      //   )}"`
      // );
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
    this.isUsersignin =
      localStorage.getItem('isUsersignin') == 'true' ? true : false;
    console.log('isUsersignin', this.isUsersignin);
  }

  autoLogout() {
    setTimeout(() => {
      this.signOutUser();
    }, 21600000);
  }

  async initializeUserData() {
    try {
      const userData = await this.getUser();
      this.userData = userData;

      // console.log('User Data:111', this.userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // auth-functionality ends here
}
