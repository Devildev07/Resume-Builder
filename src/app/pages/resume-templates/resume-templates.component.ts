import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ViewTemplateComponent } from 'src/app/modals/view-template/view-template.component';

@Component({
  selector: 'app-resume-templates',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule],

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
