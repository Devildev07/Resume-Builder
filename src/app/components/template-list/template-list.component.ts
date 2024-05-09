import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { DialogBoxComponent } from 'src/app/modals/dialog-box/dialog-box.component';
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
    console.log('template === ', template);
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
      console.log('this.fatchTemplate === ', this.fatchTemplate);
    } else if (this.commonService.currentUrl === '/dashboard') {
      this.fatchTemplate = this.commonService.getLocalStorage(
        'selectedTemplateArray'
      );
      console.log('this.fatchTemplate === ', this.fatchTemplate);
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
      },
      (error) => {
        console.error('Error fetching template:', error);
      }
    );

    this.addToLocalStorage(template);
  }

  addToLocalStorage(template: any) {
    let storageData = this.commonService.getLocalStorage(
      'selectedTemplateArray'
    );
    console.log('storageData', storageData);
    // console.log('storageData', storageData);
    if (storageData && storageData != null) {
      const exists = storageData.some((item: any) => {
        // console.log('item.Id === ', item.Id);
        // console.log('this.temp_id === ', this.temp_id);
        return item.Id === this.temp_id;
      });
      if (exists) {
        // console.log('exists === ', exists);
        this.dialog.open(DialogBoxComponent, {
          width: '400px',
          height: 'auto',
          panelClass: 'rounded-lg',
          data: {
            dialogCss: 'warning-dialog',
            message: 'Template already added',
            buttonText: 'OK',
            buttonCss: 'warning-dialog-btn',
          },
        });
        setTimeout(() => {
          this.dialog.closeAll();
          this.route.navigate(['/dashboard/builder']);
        }, 2000);
        // console.warn('Template already exists in storage');
      } else {
        this.commonService.selectedTemplateArray = storageData;
        this.commonService.selectedTemplateArray.push(template);
        this.commonService.setLocalStorage(
          'selectedTemplateArray',
          this.commonService.selectedTemplateArray
        );
        console.log('if called');
        this.route.navigate(['/dashboard/builder']);
      }
    } else {
      // console.log('else called');
      this.commonService.selectedTemplateArray.push(template);
      this.commonService.setLocalStorage(
        'selectedTemplateArray',
        this.commonService.selectedTemplateArray
      );
    }
  }

  deleteTemplate(template: any) {
    // console.log('template === ', template);
    const selectedTemplateArray = this.commonService.getLocalStorage(
      'selectedTemplateArray'
    );
    const indexToDelete = selectedTemplateArray.findIndex(
      (item: any) => item.Id === template.Id
    );
    if (indexToDelete !== -1) {
      selectedTemplateArray.splice(indexToDelete, 1);
      this.commonService.setLocalStorage(
        'selectedTemplateArray',
        selectedTemplateArray
      );
      this.fetchTemplates();
    } else {
      console.log('Template not found in selectedTemplateArray');
    }
  }

  editTemplate(template: any) {
    console.log('template === ', template);
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
        this.route.navigate(['/dashboard/builder']);
      },
      (error) => {
        console.error('Error fetching template:', error);
      }
    );
  }
}
