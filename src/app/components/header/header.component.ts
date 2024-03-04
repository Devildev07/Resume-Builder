import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { AuthModalComponent } from 'src/app/modals/auth-modal/auth-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  theme = '';
  savedTheme: any = 'light';
  constructor(
    public commonService: CommonServicesService,
    public dialog: MatDialog
  ) {}

  toggleMobMenu() {
    const mobMenu = document.getElementById('mob-menu');
    mobMenu?.classList.toggle('show-menu');
  }
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

  openAuthModal(formModeClicked: 'login' | 'signup' = 'login') {
    this.dialog.open(AuthModalComponent, {
      backdropClass: 'backdrop-blur',
      width: '500px',
      panelClass: 'rounded-md',
      data: { formMode: formModeClicked },
      
    });
    // console.log(formModeClicked);
  }
}
