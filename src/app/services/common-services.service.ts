import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {
  canShowModal: boolean = false;

  constructor() { }
}
