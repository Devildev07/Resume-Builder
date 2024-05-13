import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { CommonServicesService } from '../common-services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUsersignin: boolean = false;
  userEmail: any = '';
  userPass: any = '';
  userExists: boolean = false;

  private firestore: Firestore = inject(Firestore);

  constructor(public commonService: CommonServicesService) {}

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
      console.log('randomId', randomId);

      const collectionInstance = collection(this.firestore, 'users');
      const docRef = await addDoc(collectionInstance, {
        ...userData,
        Id: randomId,
      });

      console.log('User registered successfully!', docRef.id);

      return true;
    }
  }

  // signinUser
  async signinUser(userData: any) {
    try {
      await this.getCurrentUser(userData);

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
      });
      return querySnapshot.docs;
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

  // auth-functionality ends here

  autoLogout() {
    setTimeout(() => {
      this.signOutUser();
    }, 60000);
  }
}
