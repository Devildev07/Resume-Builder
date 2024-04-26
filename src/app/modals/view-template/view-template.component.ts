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
    Object.keys(templateData).forEach((key: any) => {
      if (Array.isArray(templateData[key])) {
        // console.log("templateArraySection[this.temp_id][key] === ", key, templateData[key]);
        let html = '';
        switch (key) {
          case 'skills_list':
            if (templateArraySection[this.temp_id].hasOwnProperty('skills_list')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{skillTitle}}', keyItem.skillTitle)
                temp = temp.replace('{{skillvalues}}', keyItem.skillvalues)
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              // console.log("html === ", key, html);
              const skillRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(skillRegex, html);
            }
            break;
          case 'experience_list':
            if (templateArraySection[this.temp_id].hasOwnProperty('experience_list')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{jobTitle}}', keyItem.jobTitle)
                temp = temp.replace('{{companyName}}', keyItem.companyName)
                temp = temp.replace('{{from}}', keyItem.from)
                temp = temp.replace('{{to}}', keyItem.to)
                temp = temp.replace('{{experienceYear}}', keyItem.experienceYear)
                temp = temp.replace('{{description}}', keyItem.description)
                if (Array.isArray(keyItem.responsibilities)) {
                  let responsibilitiesHTML = '';
                  // console.log("keyItem.responsibilities",keyItem.responsibilities);

                  keyItem.responsibilities.forEach((responsibility: string, index: number) => {
                    if (index > 0 || responsibility.trim() !== '') {
                      responsibilitiesHTML += `<li>${responsibility}</li>`;
                    }
                  });
                  temp = temp.replace('{{responsibilities}}', responsibilitiesHTML);
                } else {
                  temp = temp.replace('{{responsibilities}}', keyItem.responsibilities);
                }
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              console.log("html === ", key, typeof html, typeof this.templateContent);
              const expRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(expRegex, html);
            }
            break;
          case 'education_list':
            if (templateArraySection[this.temp_id].hasOwnProperty('education_list')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{courseTitle}}', keyItem.courseTitle)
                temp = temp.replace('{{institutionName}}', keyItem.institutionName)
                temp = temp.replace('{{from}}', keyItem.from)
                temp = temp.replace('{{to}}', keyItem.to)
                temp = temp.replace('{{educationYear}}', keyItem.educationYear)
                temp = temp.replace('{{degree}}', keyItem.degree)
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              console.log("html === ", key, typeof html, typeof this.templateContent);
              const eduRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(eduRegex, html);
            }
            break;
          case 'language_list':
            if (templateArraySection[this.temp_id].hasOwnProperty('language_list')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{languagetitle}}', keyItem.languagetitle)
                temp = temp.replace('{{languagevalues}}', keyItem.languagevalues)

                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              console.log("html === ", key, typeof html, typeof this.templateContent);
              const langRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(langRegex, html);
            }
            break;
          case 'projects_list':
            if (templateArraySection[this.temp_id].hasOwnProperty('projects_list')) {
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{projectName}}', keyItem.projectName)
                temp = temp.replace('{{languagevalues}}', keyItem.languagevalues),
                  temp = temp.replace('{{from}}', keyItem.from)
                temp = temp.replace('{{to}}', keyItem.to)
                temp = temp.replace('{{year}}', keyItem.year)
                temp = temp.replace('{{description}}', keyItem.description)
                if (Array.isArray(keyItem.skills)) {
                  let skillsHTML = '';
                  // console.log("keyItem.skills",keyItem.skills);

                  keyItem.skills.forEach((skill: string, index: number) => {
                    if (index > 0 || skill.trim() !== '') {
                      skillsHTML += `<li>${skill}</li>`;
                    }
                  });
                  temp = temp.replace('{{skills}}', skillsHTML);
                } else {
                  temp = temp.replace('{{skills}}', keyItem.skills);
                }

                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              console.log("html === ", key, typeof html, typeof this.templateContent);
              const projectRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(projectRegex, html);
            }
            break;
          default:
            console.log(`No match found for key: ${key}`);
            break;
        }


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
    const selectedTempData = {
      id: this.temp_id,
      content: this.templateContent
    }
    this.commonService.setData(selectedTempData);
    this.route.navigate(['/dashboard/builder'])
    this.dialogRef.close();
    // console.log("this.templateContent.id === ", this.temp_id);
  }

}
