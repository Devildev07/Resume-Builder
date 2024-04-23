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
  templateId: any = [];
  templatePath: any
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
    this.http.get(template.Path, { responseType: 'text' }).subscribe(
        (templateContent) => {
          this.dialog.open(ViewTemplateComponent, {
            backdropClass: 'backdrop-blur',
            width: '1024px',
            height: '640px',
            panelClass: 'rounded-md',
            data: { templateContent: templateContent },
          });
        },
        (error) => {
          console.error('Error fetching template:', error);
        }
      );
  }

  fetchTemplates() {
    const temp = template;
    this.templates=[];
    temp.forEach((temp: any, index: any) => {
      this.templates.push(temp);      
    });
    console.log("templates === ",this.templates);
  }
}
