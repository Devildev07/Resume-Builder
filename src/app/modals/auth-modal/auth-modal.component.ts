import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent {
  @Input('show')
  show = false;
  constructor(
    public commonService: CommonServicesService,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    // if (this.show === true) {
    //   const bodyElement = this.elementRef.nativeElement.ownerDocument.body;
    //   this.renderer.addClass(bodyElement, 'overflow-hidden');
    // }
  }
}
