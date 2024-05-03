import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {CommonServicesService} from 'src/app/services/common-services.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent, MatDialog,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {templateArraySection, templateData} from 'src/assets/templates/templates';


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
export class ViewTemplateComponent implements OnInit {
  safeImg: SafeHtml = '';

  templateContent: any;
  templateInfo: any;
  temp_id: any;
  receivedDataInfo: any


  constructor(
    public commonService: CommonServicesService,
    public dialogRef: MatDialogRef<ViewTemplateComponent>,
    public route: Router,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      templateContent: any,
      templateInfo: any,
      receivedTemplateData: any,
      resumeData: any
    }
  ) {
    if (this.commonService.currentUrl === '/templates') {
      this.templateContent = data?.templateContent;
      this.templateInfo = data?.templateInfo;
      // console.log("this.templateContent === ", this.templateContent, this.templateInfo);
      // console.log('templateData', templateData)
      this.temp_id = this.templateInfo.Id
      this.safeImg = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${this.templateInfo.Img}" alt="Dynamic Image" fill>`
      );
    } else if (this.commonService.currentUrl === '/dashboard/builder') {

      // console.log(data?.resumeData);

      this.receivedDataInfo = data?.receivedTemplateData;
      // console.log("received data", this.receivedDataInfo,)

      this.templateContent = data?.receivedTemplateData.Content
      this.temp_id = data?.receivedTemplateData.Id

      const formData = data?.resumeData;
      // console.log("formData", formData);


      Object.keys(templateData).forEach((key) => {
        if (formData.formBuilder.hasOwnProperty(key)) {
          // console.log("key", key);
          templateData[key] = formData.formBuilder[key];
        } else if (Array.isArray(templateData[key])) {
          templateData[key].forEach((item: any, index: number) => {
            if (formData.formBuilder[key] && formData.formBuilder[key][index]) {
              Object.keys(item).forEach((subKey) => {
                if (formData.formBuilder[key][index].hasOwnProperty(subKey)) {
                  item[subKey] = formData.formBuilder[key][index][subKey];
                }
              });
            }
          });
        }
      });
      console.log(templateData);
    }


    Object.keys(templateData).forEach((key: any) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      if (key === 'personalDetails' && templateData[key]) {
        let html = '';
        const personalDetails = templateData[key];
        html += this.templateContent
          .replace('{{ firstName }}', personalDetails.firstName)
          .replace('{{ lastName }}', personalDetails.lastName)
          .replace('{{ jobTitle }}', personalDetails.jobTitle)
          .replace('{{ email }}', personalDetails.email)
          .replace('{{ phone }}', personalDetails.phone)
          .replace('{{ birthDate }}', personalDetails.birthDate)
          .replace('{{ website }}', personalDetails.website)
          .replace('{{ address }}', personalDetails.address)
          .replace('{{ postalCode }}', personalDetails.postalCode)
          .replace('{{ city }}', personalDetails.city)
          .replace('{{ state }}', personalDetails.state)
          .replace('{{ country }}', personalDetails.country)
          .replace('{{ description }}', personalDetails.description);
        this.templateContent = html;
      } else if (Array.isArray(templateData[key])) {
        // console.log("templateArraySection[this.temp_id][key] === ", key, templateData[key]);
        let html = '';
        switch (key) {
          case 'skillDetails':
            if (templateArraySection[this.temp_id].hasOwnProperty('skillDetails')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{skillName}}', keyItem.skillName)
                temp = temp.replace('{{skillValue}}', keyItem.skillValue)
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              // console.log("html === ", key, html);
              const skillRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(skillRegex, html);
            }
            break;
          case 'experienceDetails':
            if (templateArraySection[this.temp_id].hasOwnProperty('experienceDetails')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{jobTitle}}', keyItem.jobTitle)
                temp = temp.replace('{{companyName}}', keyItem.companyName)
                temp = temp.replace('{{city}}', keyItem.city)
                temp = temp.replace('{{startDate}}', keyItem.startDate)
                temp = temp.replace('{{endDate}}', keyItem.endDate)
                temp = temp.replace('{{experienceYear}}', keyItem.experienceYear)
                temp = temp.replace('{{description}}', keyItem.description)
                // if (Array.isArray(keyItem.responsibilities)) {
                //   let responsibilitiesHTML = '';
                //   // console.log("keyItem.responsibilities",keyItem.responsibilities);
                //
                //   keyItem.responsibilities.forEach((responsibility: string, index: number) => {
                //     if (index > 0 || responsibility.trim() !== '') {
                //       responsibilitiesHTML += `<li>${responsibility}</li>`;
                //     }
                //   });
                //   temp = temp.replace('{{responsibilities}}', responsibilitiesHTML);
                // } else {
                //   temp = temp.replace('{{responsibilities}}', keyItem.responsibilities);
                // }
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              // console.log("html === ", key, typeof html, typeof this.templateContent);
              const expRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(expRegex, html);
            }
            break;
          case 'educationalDetails':
            if (templateArraySection[this.temp_id].hasOwnProperty('educationalDetails')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{institutionName}}', keyItem.institutionName)
                temp = temp.replace('{{studyField}}', keyItem.studyField)
                temp = temp.replace('{{degree}}', keyItem.degree)
                temp = temp.replace('{{grades}}', keyItem.grades)
                temp = temp.replace('{{startDate}}', keyItem.startDate)
                temp = temp.replace('{{endDate}}', keyItem.endDate)
                temp = temp.replace('{{description}}', keyItem.description)
                temp = temp.replace('{{city}}', keyItem.city)
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              // console.log("html === ", key, typeof html, typeof this.templateContent);
              const eduRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(eduRegex, html);
            }
            break;
          case 'languageDetails':
            if (templateArraySection[this.temp_id].hasOwnProperty('languageDetails')) {
              // console.log("templateData[key] === ", templateData[key]);
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{languageName}}', keyItem.languageName)
                temp = temp.replace('{{languageValue}}', keyItem.languageValue)

                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              // console.log("html === ", key, typeof html, typeof this.templateContent);
              const langRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(langRegex, html);
            }
            break;
          case 'projectDetails':
            if (templateArraySection[this.temp_id].hasOwnProperty('projectDetails')) {
              templateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replace('{{projectTitle}}', keyItem.projectTitle)
                temp = temp.replace('{{projectLink}}', keyItem.projectLink)
                temp = temp.replace('{{projectCodeLink}}', keyItem.projectCodeLink)
                temp = temp.replace('{{projectYear}}', keyItem.projectYear)
                // temp = temp.replace('{{projectTechUsed}}', keyItem.projectTechUsed)
                temp = temp.replace('{{projectDescription}}', keyItem.projectDescription)
                if (Array.isArray(keyItem.projectTechUsed)) {
                  let projectSkillHTML = '';
                  // console.log("keyItem.projectSkill",keyItem.projectSkill);

                  keyItem.projectTechUsed.forEach((skillUsed: string, index: number) => {
                    if (index > 0 || skillUsed.trim() !== '') {
                      projectSkillHTML += `<li class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded mb-1">${skillUsed}</li>`;
                    }
                  });
                  temp = temp.replace('{{projectTechUsed}}', projectSkillHTML);
                } else {
                  temp = temp.replace('{{projectSkill}}', keyItem.projectTechUsed);
                }

                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              })
              console.log("html === ", key, typeof html, typeof this.templateContent);
              const projectRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(projectRegex, html);
            }
            break;
          case 'hobbyDetails':
            if (templateArraySection[this.temp_id].hasOwnProperty('hobbyDetails')) {
              let html = '';

              // Iterate through each hobby in the hobbyDetails array
              templateData[key].forEach((hobby: string, index: number) => {
                if (index > 0 || hobby.trim() !== '') {
                  html += `<li class="px-2 mt-1">${hobby}</li>`;
                }
              });

              // Replace '{{hobbyDetails}}' placeholder in template with the generated HTML
              const hobbyRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replace(hobbyRegex, html);
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
        this.templateContent = this.templateContent.replace(regex, templateData[key]);
        // console.log('this.templateContent', this.templateContent);
      }
      // this.templateContent = this.templateContent.replace(regex, html);
    })

  }

  ngOnInit() {
    let viewModal = document.getElementById()

  }

  selectTemplate() {
    const selectedTempData = {
      Id: this.temp_id,
      Content: this.templateContent
    }
    this.commonService.setLocalStorage('selectedTempData', selectedTempData);
    // console.log("this.commonService.setData(selectedTempData)", selectedTempData)
    this.route.navigate(['/dashboard/builder'])
    this.dialogRef.close();
    // console.log("this.templateContent.id === ", this.temp_id);
  }

  downloadTemplate() {
    console.log("download in progress")
  }

}
