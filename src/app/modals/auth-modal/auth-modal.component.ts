import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatDialogActions, MatDialogClose],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent implements OnInit {
 
  constructor(
    public commonService: CommonServicesService,
 
  ) {
  }
  ngOnInit(): void {}

}
