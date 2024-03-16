import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  savedTheme: any = 'light';

  dashMenu = [
    { menu: 'home', pageUrl: '/home', icon: '' },
    { menu: 'templates', pageUrl: '/templates', icon: '' },
    { menu: 'profile', pageUrl: '/home', icon: '' },
  ];

  toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);

    this.savedTheme = localStorage.getItem('theme');
    console.log(this.savedTheme);
    if (this.savedTheme) {
      document.documentElement.classList.add(this.savedTheme);
    }
  }
}
