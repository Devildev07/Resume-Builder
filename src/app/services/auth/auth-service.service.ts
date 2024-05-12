import { Injectable, inject } from '@angular/core';
// import { Firestore,collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserLogin: boolean = false;
  userEmail: any = '';
  userId: any = '';

  // private firestore: Firestore = inject(Firestore);

  constructor(private firestore: AngularFirestore) {}

  // auth-functionality starts here
  // registerUser
  async registerUser(userData: any): Promise<boolean> {
    const randomId = '_Id' + Math.random().toString(36).substring(2);
    console.log('randomId', randomId);

    try {
      await this.firestore.collection('users').doc(randomId).set(userData);
      console.log('User registered successfully!');
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
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
