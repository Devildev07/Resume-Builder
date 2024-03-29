import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeTemplatesComponent } from './pages/resume-templates/resume-templates.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGaurdGuard } from './services/auth/auth-gaurd.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResumeFormComponent } from './pages/resume-form/resume-form.component';

const routes: Routes = [
  {
    path: 'home',
    // title: 'Resumify | Home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    title: 'Resumify | Dashboard',
    component: UserDashboardComponent,
    // canActivate: [authGaurdGuard],
    children: [
      {
        path: 'profile',
        title: 'Resumify | Profile',
        component: ProfileComponent,
        // canActivate: [authGaurdGuard],
      },
      {
        path: 'builder',
        title: 'Resumify | Resume Builder',
        component: ResumeFormComponent,
        // canActivate: [authGaurdGuard],
      },
    ],
  },
  {
    path: 'templates',
    title: 'Resumify | Resume Templates',
    component: ResumeTemplatesComponent,
    // canActivate: [authGaurdGuard],
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
