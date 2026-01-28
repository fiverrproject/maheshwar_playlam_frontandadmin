import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Api } from '../../../core/services/api';

@Component({
   selector: 'app-footer',
   standalone: false,
   templateUrl: './footer.html',
   styleUrl: './footer.scss',
})
export class Footer {
   showBackToTop = false;
   all_data: any

   constructor(public api_s: Api, private cf: ChangeDetectorRef) {
      this.get_data();
   }

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

   get_data() {
      this.api_s.postApi('site-config-get', '').then((resp: any) => {
         this.all_data = resp.data[0];
         this.cf.detectChanges();
      }, (err: any) => {
         //  this.isLoading = false;
      });
   }


}
