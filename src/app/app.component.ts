import { Component } from '@angular/core';
import { CommonServicesService } from './services/common-services.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'resume-builder';
  currentUrl?: string;
  routerSubscription: any;
  constructor(
    public commonService: CommonServicesService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUrl();
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  getCurrentUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url
        // console.log('Current URL:', this.currentUrl);
      }
    });
  }
}
