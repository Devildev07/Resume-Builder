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
  safeImg: SafeHtml = '';

  templateContent: any;
  templateInfo: any;
  temp_id: any;

  constructor(
    public commonService: CommonServicesService,
    public dialogRef: MatDialogRef<ViewTemplateComponent>,
    public route: Router,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: { templateContent: any, templateInfo: any }
  ) {
    this.templateContent = data.templateContent;
    this.templateInfo = data.templateInfo;
    // console.log("this.templateContent === ", this.templateContent, this.templateInfo);
    // console.log('templateData', templateData)
    this.temp_id = this.templateInfo.Id
    this.safeImg = this.sanitizer.bypassSecurityTrustHtml(
      `<img src="${this.templateInfo.Img}" alt="Dynamic Image">`
    );
    // Object.keys(templateData).forEach((key: any) => {

    //   console.log(this.temp_id);

    //   Object.keys(templateArraySection[this.temp_id]).forEach((keyItem: any) => {
    //     console.log(keyItem);

    //   })


    //   if (Array.isArray(templateData[key]) && key == "skills_list") {
    //     let html = '';

    //     templateData[key].forEach((keyItem: any) => {
    //       let temp = '';

    //       temp += templateArraySection[this.temp_id][key].replace('{{skillTitle}}', keyItem.skillTitle)
    //       temp = temp.replace('{{skillvalues}}', keyItem.skillvalues)
    //       const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    //       html += temp;

    //     })
    //     // console.log("html === ", key, html);
    //     const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    //     this.templateContent = this.templateContent.replace(regex, html);
    //   } else {
    //     // console.log("else === ");
    //     const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    //     this.templateContent = this.templateContent.replace(regex, templateData[key]);
    //     // console.log('this.templateContent', this.templateContent);
    //   }

    // })

    Object.keys(templateData).forEach((key: string) => {
      if (Array.isArray(templateData[key]) && templateArraySection.hasOwnProperty(key)) {
        let html = '';
        templateData[key].forEach((keyItem: any) => {
          let temp = '';
          const templateKeys = Object.keys(templateArraySection[key]);
          templateKeys.forEach((templateKey: string) => {
            temp += templateArraySection[key][templateKey].replace(new RegExp(`{{\\s*${templateKey}\\s*}}`, 'g'), keyItem[templateKey]);
          });
          html += temp;
        });
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        this.templateContent = this.templateContent.replace(regex, html);
      } else {
        console.log('else');
        
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        this.templateContent = this.templateContent.replace(regex, templateData[key]);
      }
    });
    
    
  }

  selectTemplate() {
    this.route.navigate(['/dashboard/builder'], { queryParams: { id: this.temp_id } })
    this.dialogRef.close();
    console.log("this.templateContent.id === ", this.temp_id);
  }

}
