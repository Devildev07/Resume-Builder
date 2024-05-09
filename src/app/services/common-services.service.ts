import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServicesService {
  // canShowModal: boolean = false;
  superAdmin = 'Dewanshu';
  currentUrl?: string;
  routerSubscription: any;
  private sharedData: any;
  selectedTemplateArray: any[] = [];

  constructor(public router: Router) {
    this.getCurrentUrl();
  }

  // localStorage
  setLocalStorage(key: string, value: any): void {
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

  asyncEmailValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Observable((observer) => {
      // Simulate asynchronous validation
      setTimeout(() => {
        if (
          control.value &&
          !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value)
        ) {
          observer.next({ invalidEmail: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }
}
