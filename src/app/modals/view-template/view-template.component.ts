import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonServicesService } from 'src/app/services/common-services.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  templateArraySection,
  templateData,
} from 'src/assets/templates/templates';
import { AutoAdjustHeightDirective } from '../../directives/auto-adjust-height.directive';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    AutoAdjustHeightDirective,
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
  receivedDataInfo: any;

  templateName: any;

  zoomFactor = 0.1;

  constructor(
    public commonService: CommonServicesService,
    public dialogRef: MatDialogRef<ViewTemplateComponent>,
    public route: Router,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      templateContent: any;
      templateInfo: any;
      receivedTemplateData: any;
      resumeData: any;
    }
  ) {
    if (this.commonService.currentUrl === '/templates') {
      this.templateContent = data?.templateContent;
      this.templateInfo = data?.templateInfo;
      // console.log("this.templateContent === ", this.templateContent, this.templateInfo);
      // console.log('templateData', templateData)
      this.temp_id = this.templateInfo.Id;
      this.templateName = this.templateInfo.Name;

      this.safeImg = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${this.templateInfo.Img}" alt="${this.templateName}" fill>`
      );
      this.updatingResumeData(templateData);
    } else if (
      this.commonService.currentUrl === '/dashboard/builder' ||
      this.commonService.currentUrl === '/dashboard'
    ) {
      if (data?.receivedTemplateData) {
        this.dataReplacement(data?.receivedTemplateData, data?.resumeData);
        // this.receivedDataInfo = data?.receivedTemplateData;

        // this.templateContent = data?.receivedTemplateData.Content;
        // this.temp_id = data?.receivedTemplateData.Id;
        // this.templateName = data?.receivedTemplateData.Name;

        // const formData = data?.resumeData;
        // console.log('data?.resumeData === ', data?.resumeData);

        // Object.keys(templateData).forEach((key) => {
        //   if (formData.formBuilder.hasOwnProperty(key)) {
        //     // console.log("key", key);
        //     templateData[key] = formData.formBuilder[key];
        //   } else if (Array.isArray(templateData[key])) {
        //     templateData[key].forEach((item: any, index: number) => {
        //       if (
        //         formData.formBuilder[key] &&
        //         formData.formBuilder[key][index]
        //       ) {
        //         Object.keys(item).forEach((subKey) => {
        //           if (formData.formBuilder[key][index].hasOwnProperty(subKey)) {
        //             item[subKey] = formData.formBuilder[key][index][subKey];
        //           }
        //         });
        //       }
        //     });
        //   }
        // });
        // console.log(templateData);
        // this.updatingResumeData(templateData);
      }
      this.dataReplacement(
        data?.templateInfo,
        this.commonService.getLocalStorage('setLocalResumeFormData')
      );
    }
  }

  ngOnInit() {}
  dataReplacement(receivedData: any, resumeFormData: any) {
    this.receivedDataInfo = receivedData;

    this.templateContent = receivedData.Content;
    this.temp_id = receivedData.Id;
    this.templateName = receivedData.Name;

    const formData = resumeFormData;
    console.log('resumeFormData === ', resumeFormData);

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
    this.updatingResumeData(templateData);
  }

  updatingResumeData(updatedTemplateData: any) {
    Object.keys(updatedTemplateData).forEach((key: any) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      if (key === 'personalDetails' && updatedTemplateData[key]) {
        let html = '';
        const personalDetails = updatedTemplateData[key];
        html += this.templateContent
          .replaceAll('{{ firstName }}', personalDetails.firstName)
          .replaceAll('{{ lastName }}', personalDetails.lastName)
          .replaceAll('{{ jobTitle }}', personalDetails.jobTitle)
          .replaceAll('{{ email }}', personalDetails.email)
          .replaceAll('{{ phone }}', personalDetails.phone)
          .replaceAll('{{ birthDate }}', personalDetails.birthDate)
          .replaceAll('{{ website }}', personalDetails.website)
          .replaceAll('{{ address }}', personalDetails.address)
          .replaceAll('{{ postalCode }}', personalDetails.postalCode)
          .replaceAll('{{ city }}', personalDetails.city)
          .replaceAll('{{ state }}', personalDetails.state)
          .replaceAll('{{ country }}', personalDetails.country)
          .replaceAll('{{ description }}', personalDetails.description);
        this.templateContent = html;
      } else if (Array.isArray(updatedTemplateData[key])) {
        // console.log("templateArraySection[this.temp_id][key] === ", key, updatedTemplateData[key]);
        let html = '';
        switch (key) {
          case 'skillDetails':
            if (
              templateArraySection[this.temp_id].hasOwnProperty('skillDetails')
            ) {
              // console.log("updatedTemplateData[key] === ", updatedTemplateData[key]);
              updatedTemplateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replaceAll(
                  '{{skillName}}',
                  keyItem.skillName
                );
                temp = temp.replaceAll('{{skillValue}}', keyItem.skillValue);
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              });
              // console.log("html === ", key, html);
              const skillRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replaceAll(
                skillRegex,
                html
              );
            }
            break;
          case 'experienceDetails':
            if (
              templateArraySection[this.temp_id].hasOwnProperty(
                'experienceDetails'
              )
            ) {
              // console.log("updatedTemplateData[key] === ", updatedTemplateData[key]);
              updatedTemplateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replaceAll(
                  '{{jobTitle}}',
                  keyItem.jobTitle
                );
                temp = temp.replaceAll('{{companyName}}', keyItem.companyName);
                temp = temp.replaceAll('{{city}}', keyItem.city);
                temp = temp.replaceAll('{{startDate}}', keyItem.startDate);
                temp = temp.replaceAll('{{endDate}}', keyItem.endDate);
                temp = temp.replaceAll(
                  '{{experienceYear}}',
                  keyItem.experienceYear
                );
                temp = temp.replaceAll('{{description}}', keyItem.description);
                // if (Array.isArray(keyItem.responsibilities)) {
                //   let responsibilitiesHTML = '';
                //   // console.log("keyItem.responsibilities",keyItem.responsibilities);
                //
                //   keyItem.responsibilities.forEach((responsibility: string, index: number) => {
                //     if (index > 0 || responsibility.trim() !== '') {
                //       responsibilitiesHTML += `<li>${responsibility}</li>`;
                //     }
                //   });
                //   temp = temp.replaceAll('{{responsibilities}}', responsibilitiesHTML);
                // } else {
                //   temp = temp.replaceAll('{{responsibilities}}', keyItem.responsibilities);
                // }
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              });
              // console.log("html === ", key, typeof html, typeof this.templateContent);
              const expRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replaceAll(
                expRegex,
                html
              );
            }
            break;
          case 'educationalDetails':
            if (
              templateArraySection[this.temp_id].hasOwnProperty(
                'educationalDetails'
              )
            ) {
              // console.log("updatedTemplateData[key] === ", updatedTemplateData[key]);
              updatedTemplateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replaceAll(
                  '{{institutionName}}',
                  keyItem.institutionName
                );
                temp = temp.replaceAll('{{studyField}}', keyItem.studyField);
                temp = temp.replaceAll('{{degree}}', keyItem.degree);
                temp = temp.replaceAll('{{grades}}', keyItem.grades);
                temp = temp.replaceAll('{{startDate}}', keyItem.startDate);
                temp = temp.replaceAll('{{endDate}}', keyItem.endDate);
                temp = temp.replaceAll('{{description}}', keyItem.description);
                temp = temp.replaceAll('{{city}}', keyItem.city);
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              });
              // console.log("html === ", key, typeof html, typeof this.templateContent);
              const eduRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replaceAll(
                eduRegex,
                html
              );
            }
            break;
          case 'languageDetails':
            if (
              templateArraySection[this.temp_id].hasOwnProperty(
                'languageDetails'
              )
            ) {
              // console.log("updatedTemplateData[key] === ", updatedTemplateData[key]);
              updatedTemplateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replaceAll(
                  '{{languageName}}',
                  keyItem.languageName
                );
                temp = temp.replaceAll(
                  '{{languageValue}}',
                  keyItem.languageValue
                );

                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              });
              // console.log("html === ", key, typeof html, typeof this.templateContent);
              const langRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replaceAll(
                langRegex,
                html
              );
            }
            break;
          case 'projectDetails':
            if (
              templateArraySection[this.temp_id].hasOwnProperty(
                'projectDetails'
              )
            ) {
              updatedTemplateData[key].forEach((keyItem: any) => {
                let temp = '';
                temp += templateArraySection[this.temp_id][key].replaceAll(
                  '{{projectTitle}}',
                  keyItem.projectTitle
                );
                temp = temp.replaceAll('{{projectLink}}', keyItem.projectLink);
                temp = temp.replaceAll(
                  '{{projectCodeLink}}',
                  keyItem.projectCodeLink
                );
                temp = temp.replaceAll('{{projectYear}}', keyItem.projectYear);
                // temp = temp.replaceAll('{{projectTechUsed}}', keyItem.projectTechUsed)
                temp = temp.replaceAll(
                  '{{projectDescription}}',
                  keyItem.projectDescription
                );
                if (Array.isArray(keyItem.projectTechUsed)) {
                  let projectSkillHTML = '';
                  // console.log("keyItem.projectSkill",keyItem.projectSkill);

                  keyItem.projectTechUsed.forEach(
                    (skillUsed: string, index: number) => {
                      if (index > 0 || skillUsed.trim() !== '') {
                        projectSkillHTML += `<li class="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded mb-1">${skillUsed}</li>`;
                      }
                    }
                  );
                  temp = temp.replaceAll(
                    '{{projectTechUsed}}',
                    projectSkillHTML
                  );
                } else {
                  temp = temp.replaceAll(
                    '{{projectSkill}}',
                    keyItem.projectTechUsed
                  );
                }

                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html += temp;
              });
              console.log(
                'html === ',
                key,
                typeof html,
                typeof this.templateContent
              );
              const projectRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replaceAll(
                projectRegex,
                html
              );
            }
            break;
          case 'hobbyDetails':
            if (
              templateArraySection[this.temp_id].hasOwnProperty('hobbyDetails')
            ) {
              let html = '';

              // Iterate through each hobby in the hobbyDetails array
              updatedTemplateData[key].forEach(
                (hobby: string, index: number) => {
                  // if (index > 0 || hobby.trim() !== '') {
                  if (index > 0) {
                    html += `<li class="px-2 mt-1">${hobby}</li>`;
                  }
                }
              );

              // replaceAll '{{hobbyDetails}}' placeholder in template with the generated HTML
              const hobbyRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
              this.templateContent = this.templateContent.replaceAll(
                hobbyRegex,
                html
              );
            }
            break;
          default:
            console.log(`No match found for key: ${key}`);
            break;
        }
        // console.log("html === ", key, html);
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        this.templateContent = this.templateContent.replaceAll(regex, html);
      } else {
        // console.log("else === ");
        this.templateContent = this.templateContent.replaceAll(
          regex,
          updatedTemplateData[key]
        );
        // console.log('this.templateContent', this.templateContent);
      }
      // this.templateContent = this.templateContent.replaceAll(regex, html);
    });
  }

  // fontMin/Max
  zoomIn() {
    this.zoomText(this.zoomFactor);
  }

  zoomOut() {
    this.zoomText(-this.zoomFactor);
  }

  zoomText(factor: number) {
    const elements = this.elementRef.nativeElement.querySelectorAll(
      '.zoomAble-text [class*=text-]'
    );
    elements.forEach((element: HTMLElement) => {
      const currentFontSize = parseFloat(
        getComputedStyle(element).fontSize || '16'
      );
      const newFontSize = currentFontSize + currentFontSize * factor;
      const currentLineHeight = parseFloat(
        getComputedStyle(element).lineHeight || `${newFontSize * 1.2}`
      );
      const newLineHeight = currentLineHeight + currentLineHeight * factor;
      this.renderer.setStyle(element, 'fontSize', `${newFontSize}px`);
      this.renderer.setStyle(element, 'lineHeight', `${newLineHeight}px`);
    });
  }

  selectTemplate() {
    const selectedTempData = {
      Id: this.temp_id,
      Content: this.templateContent,
      Name: this.templateName,
    };
    this.commonService.setLocalStorage('selectedTempData', selectedTempData);
    console.log(
      'this.commonService.setData(selectedTempData)',
      selectedTempData
    );
    this.route.navigate(['/dashboard/builder']);
    this.dialogRef.close();
    // console.log("this.templateContent.id === ", this.temp_id);
  }

  downloadTemplate(templateName: any) {
    const elementToPrint: any = document.querySelector('.template');
    // console.log('elementToPrint', elementToPrint);
    if (elementToPrint) {
      html2canvas(elementToPrint, { scale: 1.2 }).then((canvas) => {
        const pdf: any = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
        pdf.setProperties({
          title: templateName,
        });
        pdf.save(`${templateName}.pdf`);
        pdf.setFontSize(12);
      });
    } else {
      console.error('Element with class "template" not found.');
    }
  }
}
