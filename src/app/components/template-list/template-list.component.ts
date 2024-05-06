import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Router, RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import {ViewTemplateComponent} from 'src/app/modals/view-template/view-template.component';
import {CommonServicesService} from 'src/app/services/common-services.service';
import {template} from 'src/assets/templates/templates';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css'
})
export class TemplateListComponent {
  templates: any[] = [];
  temp_id: any
  templateContent: any

  constructor(
    public dialog: MatDialog,
    public commonService: CommonServicesService,
    private http: HttpClient,
    public route: Router,
  ) {
  }

  ngOnInit() {
    this.fetchTemplates();
  }

  viewTemplate(template: any) {

    this.http.get(template.Path, {responseType: 'text'}).subscribe(
      (tempContent) => {
        this.dialog.open(ViewTemplateComponent, {
          backdropClass: 'backdrop-blur',
          width: '1024px',
          height: '80vh',
          panelClass: 'rounded-md',
          data: {templateContent: tempContent, templateInfo: template},
        });
      },
      (error) => {
        console.error('Error fetching template:', error);
      }
    );
  }

  fetchTemplates() {
    const temp = template;
    this.templates = [];
    temp.forEach((temp: any, index: any) => {
      this.templates.push(temp);
    });
    console.log("templates === ", this.templates);
  }

  selectTemplate(template: any) {
    this.temp_id = template.Id;
    this.http.get(template.Path, {responseType: 'text'}).subscribe(
      (tempContent) => {
        this.templateContent = tempContent;
        const selectedTempData = {
          Id: this.temp_id,
          Content: this.templateContent,
          Name: template.Name
        }
        console.log("this.commonService.setData(selectedTempData)", selectedTempData)
        this.commonService.setLocalStorage('selectedTempData', selectedTempData);
        this.route.navigate(['/dashboard/builder'])
      },
      (error) => {
        console.error('Error fetching template:', error);
      }
    );
  }
}
