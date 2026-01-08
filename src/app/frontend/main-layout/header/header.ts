import { Component, HostListener } from '@angular/core';

@Component({
   selector: 'app-header',
   standalone: false,
   templateUrl: './header.html',
   styleUrl: './header.scss',
})
export class Header {
   isSticky: boolean = false;

   @HostListener('window:scroll', [])
   onWindowScroll() {
      const scrollTop =
         window.pageYOffset ||
         document.documentElement.scrollTop ||
         document.body.scrollTop || 0;

      this.isSticky = scrollTop > 300;
   }
}