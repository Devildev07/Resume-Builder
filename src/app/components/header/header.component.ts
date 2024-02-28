import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';

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
    public elementRef: ElementRef,
    public renderer: Renderer2
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

  openLoginModal() {
    this.commonService.canShowModal = true;
    if (this.commonService.canShowModal) {
      const bodyElement = this.elementRef.nativeElement.ownerDocument.body;
      this.renderer.addClass(bodyElement, 'overflow-hidden');
    }
  }
}
