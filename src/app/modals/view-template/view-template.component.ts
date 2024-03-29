import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose],
  templateUrl: './view-template.component.html',
  styleUrl: './view-template.component.css',
})
export class ViewTemplateComponent {
  htmlContent: SafeHtml = '';
  constructor(
    public commonService: CommonServicesService,
    private sanitizer: DomSanitizer
  ) {
    this.loadHtmlContent();
  }
  loadHtmlContent() {
    this.commonService
      .getHtmlContent('template-01/temp01.html')
      .subscribe((content: string) => {
        let temp = content.replace('Your_name_key', 'dewanshu');
        this.htmlContent = this.getSafeHtmlContent(temp);
      });
  }
  getSafeHtmlContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
