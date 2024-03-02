import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  theme = '';
  constructor(
    public commonService: CommonServicesService,
    public dialog: MatDialog,
  ) {}

  toggleMobMenu() {
    const mobMenu = document.getElementById('mob-menu');
    mobMenu?.classList.toggle('show-menu');
  }
  toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const currentTheme = html.classList.contains('dark') ? 'dark' : '';
    localStorage.setItem('theme', currentTheme);

    const savedTheme = localStorage.getItem('theme');
    // console.log(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
  }

  openAuthModal() {
    this.dialog.open(AuthModalComponent, {
      backdropClass: 'backdrop-blur',
      width: '500px',
      panelClass: 'rounded-md',
    });
  }
}
