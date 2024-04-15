import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ViewTemplateComponent } from 'src/app/modals/view-template/view-template.component';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { template } from 'src/assets/templates/templates';

@Component({
  selector: 'app-resume-templates',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],
  encapsulation: ViewEncapsulation.Emulated,

  templateUrl: './resume-templates.component.html',
  styleUrl: './resume-templates.component.css',
})
export class ResumeTemplatesComponent implements OnInit {
  templates: any[] = [];
  fileArray: any = [];
  templateName: any = []
  templateImg: any = []

  constructor(
    public dialog: MatDialog,
    public commonService: CommonServicesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchTemplates();
  }

  viewTemplate(template: any) {
    if (!template || !template.content) {
      console.error('Invalid template data provided.');
      return;
    }

    this.dialog.open(ViewTemplateComponent, {
      backdropClass: 'backdrop-blur',
      width: '1024px',
      height: '600px',
      panelClass: 'rounded-md',
      data: { templateContent: template.content },
    });
  }


  // fetchTemplates() {
  //   this.fileArray = ['template-01', 'template-02', 'template-03', 'template-04', 'template-05']
  //   const templatesPath = './assets/templates/'; // Base path for templates

  //   // Use a loop to iterate through template directories (template-01, template-02, etc.)
  //   for (let i = 0; i < this.fileArray.length; i++) {
  //     const templateUrl = `${templatesPath}${this.fileArray[i]}/temp${i + 1}.html`;
  //     // console.log("templateUrl === ", templateUrl);
  //     // console.log("templatesPath === ",templatesPath);
  //     this.http.get(templateUrl, { responseType: 'text' }).subscribe(
  //       (templateContent) => {
  //         this.templates.push({ content: templateContent });
  //       },
  //       (error) => {
  //         console.error('Error fetching template:', error);
  //       }
  //     );
  //   }
  // }

  fetchTemplates() {
    const temp = template;
    console.log("this.templates === ", temp);
    temp.forEach((temp: any, index: any) => {
      // console.log("temp === ",temp);
      this.templateName[index] = temp.Name
      // console.log("this.templateName === ", this.templateName);
      this.templateImg.push(temp.Img)
      // this.templateImg[index] = temp.Img

      console.log("this.templateImg === ", this.templateImg);
      this.http.get(temp.Path, { responseType: 'text' }).subscribe(
        (templateContent) => {
          this.templates.push({ content: templateContent });
        },
        (error) => {
          console.error('Error fetching template:', error);
        }
      );
    })

  }



}