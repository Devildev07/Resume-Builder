import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonServicesService {
  // canShowModal: boolean = false;
  superAdmin = 'Dewanshu';

  constructor() {}

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
}
