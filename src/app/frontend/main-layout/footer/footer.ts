import { Component, HostListener } from '@angular/core';

@Component({
   selector: 'app-footer',
   standalone: false,
   templateUrl: './footer.html',
   styleUrl: './footer.scss',
})
export class Footer {
   showBackToTop = false;

   @HostListener('window:scroll', [])
   onWindowScroll() {
      const scrollTop =
         window.pageYOffset ||
         document.documentElement.scrollTop ||
         document.body.scrollTop || 0;

      this.showBackToTop = scrollTop > 300;
   }

   scrollToTop() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth' // Angular native smooth scroll
      });
   }
}
