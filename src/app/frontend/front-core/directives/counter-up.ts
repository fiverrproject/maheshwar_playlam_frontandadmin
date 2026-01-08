import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
   selector: '[appCounterUp]',
   standalone: false
})
export class CounterUp implements AfterViewInit {
   @Input() end = 0;
   @Input() duration = 2000;

   constructor(private el: ElementRef) { }

   ngAfterViewInit(): void {
      const observer = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting) {
            this.animate();
            observer.disconnect();
         }
      }, { threshold: 0.4 });

      observer.observe(this.el.nativeElement);
   }

   animate() {
      const startTime = performance.now();

      const step = (currentTime: number) => {
         const progress = Math.min((currentTime - startTime) / this.duration, 1);
         const value = Math.floor(progress * this.end);

         this.el.nativeElement.innerText = value;

         if (progress < 1) {
            requestAnimationFrame(step);
         } else {
            this.el.nativeElement.innerText = this.end + '+';
         }
      };

      requestAnimationFrame(step);
   }
}
