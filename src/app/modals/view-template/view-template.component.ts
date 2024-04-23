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
import { templateArraySection, templateData } from 'src/assets/templates/templates';


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
    console.log("this.templateContent === ", this.templateContent);
    // console.log('templateData', templateData)
    Object.keys(templateData).forEach((key: any) => {
      if (Array.isArray(templateData[key]) && key == 'skills_list') {
        console.log('key if', key, templateData[key]);
        let html = '';
        // console.log("templateArraySection === ", templateArraySection);
        templateData[key].forEach((keyItem: any, index: any) => {
          // console.log("keyItem === ", templateArraySection['template_01'], typeof templateArraySection['template_01']);
          let temp = '';

          temp += templateArraySection['template_01'][key].replace('{{skillTitle}}', keyItem.skillTitle)
          temp = temp.replace('{{skillvalues}}', keyItem.skillvalues)
          const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
          html += temp;

        })
        // console.log("html === ", key, html);
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        this.templateContent = this.templateContent.replace(regex, html);
      } else {
        // console.log("else === ");
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        this.templateContent = this.templateContent.replace(regex, templateData[key]);
        // console.log('this.templateContent', this.templateContent);
      }

    })
  }

  selectTemplate() {
    this.route.navigate(['/dashboard/builder'], { queryParams: { id: this.templateContent.id } })
    this.dialogRef.close();
    console.log("this.templateContent.id === ", this.templateContent.id);
  }

}
