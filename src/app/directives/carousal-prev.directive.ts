import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCarousalPrev]',
  standalone: true,
})
export class CarousalPrevDirective {
  constructor(public elementRef: ElementRef) { }
  @HostListener('click')
  prevFunc() {
    const el =
      this.elementRef.nativeElement.parentElement.parentElement.children[0]
        .children[0];
    const slide = el.getElementsByClassName('slide');
    el.prepend(slide[slide.length - 1]);
    // console.log(slide);
  }
}
