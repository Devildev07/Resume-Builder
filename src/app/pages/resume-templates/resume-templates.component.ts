import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ViewTemplateComponent } from 'src/app/modals/view-template/view-template.component';
import { CommonServicesService } from 'src/app/services/common-services.service';

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
  constructor(
    public dialog: MatDialog,
    public commonService: CommonServicesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchTemplates();
  }
  // viewTemplate() {
  //   this.dialog.open(ViewTemplateComponent, {
  //     backdropClass: 'backdrop-blur',
  //     width: '1000px',
  //     height: '600px',
  //     panelClass: 'rounded-md',
  //     data: '',
  //   });
  //   // console.log(formModeClicked);
  // }

  viewTemplate(template: any) {
    if (!template || !template.content) {
      console.error('Invalid template data provided.');
      return;
    }

    this.dialog.open(ViewTemplateComponent, {
      backdropClass: 'backdrop-blur',
      width: '1000px',
      height: '600px',
      panelClass: 'rounded-md',
      data: { templateContent: template.content },
    });
  }

  fetchTemplates() {
    const templatesPath = 'assets/templates/'; // Base path for templates

    // Use a loop to iterate through template directories (template-01, template-02, etc.)
    for (let i = 1; i <= 5; i++) {
      const templateUrl = `${templatesPath}template-${i
        .toString()
        .padStart(2, '0')}/temp${i}.html`;
      this.http.get(templateUrl, { responseType: 'text' }).subscribe(
        (templateContent) => {
          this.templates.push({ content: templateContent });
        },
        (error) => {
          console.error('Error fetching template:', error);
        }
      );
    }
  }
}
