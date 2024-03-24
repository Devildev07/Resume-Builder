import { Component } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  tabs = ['Profile', 'Account Settings'];
  activeTab = 0;

  constructor(public commonService: CommonServicesService) {}
}
