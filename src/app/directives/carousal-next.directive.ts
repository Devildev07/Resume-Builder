import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCarousalNext]',
  standalone: true,
})
export class CarousalNextDirective {
  constructor(public elementRef: ElementRef) {}

  @HostListener('click')
  nextFunc() {
    const el =
      this.elementRef.nativeElement.parentElement.parentElement.children[0]
        .children[0];
    const slide = el.getElementsByClassName('slide');
    el.append(slide[0]);
    // console.log(slide);
  }
}
