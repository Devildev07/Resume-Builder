import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeTemplatesComponent } from './templates/resume-templates/resume-templates.component';

const routes: Routes = [
  {
    path: 'templates',
    title: 'Resume Templates',
    component: ResumeTemplatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
