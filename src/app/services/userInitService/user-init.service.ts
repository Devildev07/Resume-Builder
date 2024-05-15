import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { CommonServicesService } from '../common-services.service';

@Injectable({
  providedIn: 'root',
})
export class UserInitService {
  constructor(
    private authService: AuthServiceService,
    private commonService: CommonServicesService
  ) {}

  async initializeUserData() {
    try {
      const userData = await this.authService.getUser();
      this.commonService.userData = userData;

      console.log('User Data:', this.commonService.userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
}
