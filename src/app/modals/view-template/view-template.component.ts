import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonServicesService } from 'src/app/services/common-services.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
  ],
  templateUrl: './view-template.component.html',
  styleUrl: './view-template.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ViewTemplateComponent {
  // htmlContent: SafeHtml = '';

  templateContent: any;

  constructor(
    public commonService: CommonServicesService,
    public dialogRef: MatDialogRef<ViewTemplateComponent>,
    public route: Router,
    @Inject(MAT_DIALOG_DATA) public data: { templateContent: any }
  ) {
    this.templateContent = data.templateContent;
    // console.log("this.templateContent === ",this.templateContent);

  }

  selectTemplate(){
    this.route.navigate(['/dashboard/builder'],{ queryParams: { id: this.templateContent.id } }) 
    this.dialogRef.close();
    console.log("this.templateContent.id === ",this.templateContent.id);
  }

}
