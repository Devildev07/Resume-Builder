import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonServicesService } from 'src/app/services/common-services.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
  ],
  templateUrl: './view-template.component.html',
  styleUrl: './view-template.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ViewTemplateComponent {
  // htmlContent: SafeHtml = '';

  templateContent: string | any;

  constructor(
    public commonService: CommonServicesService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ViewTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { templateContent: string }
  ) {
    // this.loadHtmlContent();

    this.templateContent = data.templateContent;
  }

  // close() {
  //   this.dialogRef.close();
  // }
  // loadHtmlContent() {
  //   this.commonService
  //     .getHtmlContent('template-01/temp01.html')
  //     .subscribe((content: string) => {
  //       let temp = content.replace('Your_name_key', 'dewanshu');
  //       this.htmlContent = this.getSafeHtmlContent(temp);
  //     });
  // }
  // getSafeHtmlContent(content: string): SafeHtml {
  //   return this.sanitizer.bypassSecurityTrustHtml(content);
  // }
}
