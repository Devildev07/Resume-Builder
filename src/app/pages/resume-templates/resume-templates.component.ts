import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewTemplateComponent } from 'src/app/modals/view-template/view-template.component';

@Component({
  selector: 'app-resume-templates',
  standalone: true,
  imports: [],
  templateUrl: './resume-templates.component.html',
  styleUrl: './resume-templates.component.css',
})
export class ResumeTemplatesComponent {
  constructor(public dialog: MatDialog) {}
  viewTemplate() {
    this.dialog.open(ViewTemplateComponent, {
      backdropClass: 'backdrop-blur',
      width: '1000px',
      height: '600px',
      panelClass: 'rounded-md',
      data: '',
    });
    // console.log(formModeClicked);
  }
}
