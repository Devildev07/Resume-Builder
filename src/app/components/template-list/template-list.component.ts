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
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
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

  userDocs: any = '';

  constructor(
    public dialog: MatDialog,
    public commonService: CommonServicesService,
    public authService: AuthServiceService,
    private http: HttpClient,
    public route: Router
  ) {}

  async ngOnInit() {
    try {
      // this.userDocs = await this.authService.getUser();
      this.userDocs = this.authService.userData;
      console.log('User Docs:', this.userDocs);
      this.fetchTemplates();
    } catch (error) {
      console.error('Error fetching user docs:', error);
    }
  }

  //view template modal
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

  //fetch templates
  async fetchTemplates() {
    if (this.commonService.currentUrl === '/templates') {
      this.fatchTemplate = template;
      // console.log('this.fatchTemplate === ', this.fatchTemplate);
    } else if (this.commonService.currentUrl === '/dashboard') {
      if (
        Array.isArray(this.userDocs.userData.selectedTemplateArray) &&
        this.userDocs.userData.selectedTemplateArray.length > 0
      ) {
        this.fatchTemplate = await this.userDocs.userData.selectedTemplateArray;
        // console.log('this.fatchTemplate === ', this.fatchTemplate);
      } else {
        this.commonService.openSnackBar('No Template Added', 'OK');
      }
    }
    this.templates = [];
    if (this.fatchTemplate !== null) {
      this.fatchTemplate.forEach((temp: any, index: any) => {
        this.templates.push(temp);
      });
    }
    console.log('templates === ', this.templates);
  }

  //select template
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

    this.addToFireStore(template);
  }

  // add to firebase storage
  async addToFireStore(template: any) {
    await this.authService.initializeUserData();
    try {
      // Ensure userDocs is initialized
      if (!this.userDocs) {
        console.error('User docs are not initialized');
        return;
      }

      let storageData =
        this.authService.userData.userData.selectedTemplateArray;
      console.log('storageData:', storageData);

      if (storageData && Array.isArray(storageData) && storageData.length > 0) {
        const exists = storageData.some((item: any) => {
          // console.log('item.Id:', item.Id, 'this.temp_id:', this.temp_id);
          return item.Id === this.temp_id;
        });

        if (exists) {
          this.dialog.open(DialogBoxComponent, {
            width: '400px',
            height: 'auto',
            panelClass: 'rounded-lg',
            data: {
              title: 'Template already added',
              dialogCss: 'warning-dialog',
              message:
                'Please check your dashboard to edit your selected template',
              buttonText: 'OK',
              buttonCss: 'warning-dialog-btn',
            },
          });

          setTimeout(() => {
            this.dialog.closeAll();
            this.route.navigate(['/dashboard/builder']);
          }, 2000);
        } else {
          this.commonService.selectedTemplateArray = storageData;
          this.commonService.selectedTemplateArray.push(template);

          await this.authService.updateDocumentField(
            this.userDocs.docId,
            'selectedTemplateArray',
            this.commonService.selectedTemplateArray
          );
          this.authService.initializeUserData();
          // console.log('Template added to existing array');
          this.route.navigate(['/dashboard/builder']);
        }
      } else {
        // console.log('No existing templates, adding new one');
        this.commonService.selectedTemplateArray.push(template);

        await this.authService.updateDocumentField(
          this.userDocs.docId,
          'selectedTemplateArray',
          this.commonService.selectedTemplateArray
        );

        await this.authService.initializeUserData();
      }
    } catch (error) {
      console.error('Error in addToFireStore:', error);
    }
  }

  //delete generated template
  async deleteTemplate(template: any) {
    try {
      this.userDocs = await this.authService.userData;

      const selectedTemplateArray =
        this.userDocs.userData.selectedTemplateArray;

      const indexToDelete = selectedTemplateArray.findIndex(
        (item: any) => item.Id === template.Id
      );

      if (indexToDelete !== -1) {
        selectedTemplateArray.splice(indexToDelete, 1);

        this.commonService.selectedTemplateArray = selectedTemplateArray;

        await this.authService.updateDocumentField(
          this.userDocs.docId,
          'selectedTemplateArray',
          selectedTemplateArray
        );

        // Optionally refetch the templates if needed
        this.fetchTemplates();
      } else {
        console.log('Template not found in selectedTemplateArray');
      }
    } catch (error) {
      console.error('Error deleting template:', error);
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
