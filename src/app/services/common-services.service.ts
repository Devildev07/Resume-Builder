import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonServicesService {
  // canShowModal: boolean = false;
  superAdmin = 'Dewanshu';
  currentUrl?: string;
  routerSubscription: any;
  constructor(public router: Router) {
    this.getCurrentUrl();
  }

  // localStorage
  setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(key: string): any {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue ? JSON.parse(localStorageValue) : null;
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  getCurrentUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log('Current URL:', this.currentUrl);
      }
    });
  }
}
