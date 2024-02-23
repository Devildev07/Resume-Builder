import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public commonService: CommonServicesService) {}
  

  toggleMobMenu() {
    const mobMenu = document.getElementById('mob-menu');
    mobMenu?.classList.toggle('show-menu');
  }
}
