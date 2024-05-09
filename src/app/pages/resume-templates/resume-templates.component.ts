import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TemplateListComponent } from 'src/app/components/template-list/template-list.component';

@Component({
  selector: 'app-resume-templates',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './resume-templates.component.html',
  styleUrl: './resume-templates.component.css',
  imports: [RouterLink, RouterLinkActive, RouterModule, TemplateListComponent],
})
export class ResumeTemplatesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
