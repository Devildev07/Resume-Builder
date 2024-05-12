import { Component } from '@angular/core';
import { CommonServicesService } from './services/common-services.service';
// import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'resume-builder';

  constructor(
    public commonService: CommonServicesService // public router: Router
  ) {}

  ngOnInit() {}
}
