import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { ViewTemplateComponent } from 'src/app/modals/view-template/view-template.component';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { template } from 'src/assets/templates/templates';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css',
})
export class TemplateListComponent implements OnInit {
  templates: any[] = [];
  temp_id: any;
  templateContent: any;
  fatchTemplate: any[] = [];

  constructor(
    public dialog: MatDialog,
    public commonService: CommonServicesService,
    private http: HttpClient,
    public route: Router
  ) {}

  ngOnInit() {
    this.fetchTemplates();
  }

  viewTemplate(template: any) {
    if (!template) {
      console.error('Template is undefined or null');
      return;
    }
    // console.log('template === ', template);
    this.http.get(template.Path, { responseType: 'text' }).subscribe(
      (tempContent) => {
        this.dialog.open(ViewTemplateComponent, {
          backdropClass: 'backdrop-blur',
          width: '1024px',
          height: '80vh',
          panelClass: 'rounded-md',
          data: { templateContent: tempContent, templateInfo: template },
        });
      },
      (error) => {
        console.error('Error fetching template:', error);
      }
    );
  }

  fetchTemplates() {
    if (this.commonService.currentUrl === '/templates') {
      this.fatchTemplate = template;
      // console.log('this.fatchTemplate === ', this.fatchTemplate);
    } else if (this.commonService.currentUrl === '/dashboard') {
      this.fatchTemplate.push(
        this.commonService.getLocalStorage('selectedTemplate')
      );
      // console.log('this.fatchTemplate === ', this.fatchTemplate);
    }
    this.templates = [];
    this.fatchTemplate.forEach((temp: any, index: any) => {
      this.templates.push(temp);
    });
    console.log('templates === ', this.templates);
  }

  selectTemplate(template: any) {
    // console.log('template === ', template);
    this.temp_id = template.Id;
    this.http.get(template.Path, { responseType: 'text' }).subscribe(
      (tempContent) => {
        this.templateContent = tempContent;
        const selectedTempData = {
          Id: this.temp_id,
          Content: this.templateContent,
          Name: template.Name,
        };
        // console.log('selectedTempData', selectedTempData);
        this.commonService.setLocalStorage(
          'selectedTempData',
          selectedTempData
        );

        const selectedTemplate = template;
        // console.log('selectedTemplate', selectedTemplate);
        this.commonService.setLocalStorage(
          'selectedTemplate',
          selectedTemplate
        );
        this.route.navigate(['/dashboard/builder']);
      },
      (error) => {
        console.error('Error fetching template:', error);
      }
    );
  }
}
