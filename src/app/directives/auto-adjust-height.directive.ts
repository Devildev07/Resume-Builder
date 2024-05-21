import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutoAdjustHeight]',
  standalone: true,
})
export class AutoAdjustHeightDirective implements AfterViewInit {
  constructor(public elementRef: ElementRef, public renderer: Renderer2) { }

  ngAfterViewInit() {
    // setTimeout(() => {
    this.adjustHeight();
    // }, 500)
  }

  adjustHeight() {
    try {
      const modal = this.elementRef.nativeElement.closest(
        '.mat-mdc-dialog-container'
      );
      if (modal) {
        const modalHeight = modal.clientHeight;
        const childDivs = this.elementRef.nativeElement.parentElement.children;
        const topDivHeight = childDivs[0].clientHeight;
        const bottomDivHeight = childDivs[2].clientHeight;
        const topBottomHeightSum = topDivHeight + bottomDivHeight;
        const remainingHeight = modalHeight - topBottomHeightSum;
        console.log('remainingHeight', remainingHeight)
        const middleDiv = childDivs[1].querySelector('.mat-mdc-dialog-content');

        if (middleDiv) {
          middleDiv.style.height = `${remainingHeight - 25}px`;
        } else {
          console.warn('Middle div not found');
        }
      } else {
        console.warn('Modal not found');
      }
    } catch (error) {
      console.error('Error adjusting height:', error);
    }
  }
}
