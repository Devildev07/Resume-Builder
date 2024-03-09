import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserLogin: boolean = false;
  userEmail: any = '';
  userId: any = '';

  constructor(private ngFireAuth: AngularFireAuth) {
    const item = localStorage.getItem('userData');
    // console.log('item', item);
    if (item != undefined && item != null) {
      // let data = JSON.parse(JSON.parse(item));
      let data = JSON.parse(item);
      // console.log('data', typeof data, data);

      if (data.isUserLogin) {
        console.log('data', data);

        this.isUserLogin = true;
        console.log('isUserLogin', this.isUserLogin);

        this.userEmail = data.user.user.email;
        this.userId = data.user.user.uid;
        console.log('userEmail', this.userId);
        // console.log('isUserLogin', this.isUserLogin);
      }
    }
  }

  // auth-functionality starts here
  // registerUser
  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  // signinUser
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // signout
  async signOutUser() {
    return await this.ngFireAuth.signOut();
  }

  // get current user
  async getCurrentUser() {
    return this.ngFireAuth.authState;
  }

  //encrypt password
  encryptPass(getPass: string) {
    var passA = btoa(getPass);
    var passB = btoa('devil');
    var generatedPass = passA + '@$98#%' + passB;
    // console.log('generatedPass', generatedPass);
    return generatedPass;
  }
}
