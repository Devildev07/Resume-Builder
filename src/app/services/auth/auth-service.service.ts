import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserLogin: boolean = false;
  userEmail: any = '';
  userId: any = '';

  private firestore: Firestore = inject(Firestore);

  constructor() {}

  // auth-functionality starts here
  // registerUser
  async registerUser(userData: any): Promise<boolean> {
    const randomId = '_Id' + Math.random().toString(36).substring(2);
    console.log('randomId', randomId);

    const collectionInstance = collection(this.firestore, 'users');
    const docRef = await addDoc(collectionInstance, {
      ...userData,
      Id: randomId,
    });

    console.log('User registered successfully!', docRef.id);

    return true; // Return true to indicate success
  }

  // signinUser
  // async loginUser(email: string, password: string) {

  // }

  // signout
  // async signOutUser() {
  // }

  // get current user
  // async getCurrentUser() {
  // }

  //encrypt password
  encryptPass(getPass: string) {
    var passA = btoa(getPass);
    var passB = btoa('devil');
    var generatedPass = passA + '@$98#%' + passB;
    // console.log('generatedPass', generatedPass);
    return generatedPass;
  }
}
