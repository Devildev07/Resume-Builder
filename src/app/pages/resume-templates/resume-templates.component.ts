import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  templateName: any = [];
  templateImg: any = [];
  safeImg: SafeHtml | undefined;

  constructor(
    public dialog: MatDialog,
    public commonService: CommonServicesService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

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
      height: '580px',
      panelClass: 'rounded-md',
      data: { templateContent: template.content },
    });
  }

  fetchTemplates() {
    const temp = template;
    console.log('this.templates === ', temp);
    temp.forEach((temp: any, index: any) => {
      // console.log("temp === ", temp);
      this.templateName[index] = temp.Name;
      // console.log("this.templateName === ", this.templateName);
      this.templateImg.push(temp.Img);
      // this.templateImg[index] = temp.Img
      const imgPath = temp.Img;

      this.safeImg = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${imgPath}" alt="Dynamic Image">`
      );
      console.log('this.safeImg === ', this.safeImg);
      this.templates.push({ content: this.safeImg });
      // this.templates.push({ content: temp.Id });
      // console.log("this.templateImg === ", this.templateImg);
      // this.http.get(temp.Path, { responseType: 'text' }).subscribe(
      //   (templateContent) => {
      //     this.templates.push({ content: templateContent });
      //   },
      //   (error) => {
      //     console.error('Error fetching template:', error);
      //   }
      // );
    });
  }
}
