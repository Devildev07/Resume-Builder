import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserLogin: boolean = false;
  userEmail: any = '';
  userId: any = '';

  constructor() {}

  // auth-functionality starts here
  // registerUser
  // async registerUser(email: string, password: string) {
  //   return await
  // }

  // signinUser
  // async loginUser(email: string, password: string) {
  //   return await
  // }

  // signout
  // async signOutUser() {
  //   return await
  // }

  // get current user
  // async getCurrentUser() {
  //   return
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
