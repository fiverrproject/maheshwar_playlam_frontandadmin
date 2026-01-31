import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Api } from '../../../core/services/api';

@Component({
   selector: 'app-header',
   standalone: false,
   templateUrl: './header.html',
   styleUrl: './header.scss',
})
export class Header {
   isSticky: boolean = false;
   all_data: any

   constructor(public api_s: Api,
      private cf: ChangeDetectorRef) {
      this.get_data();
   }
   @HostListener('window:scroll', [])
   onWindowScroll() {
      const scrollTop =
         window.pageYOffset ||
         document.documentElement.scrollTop ||
         document.body.scrollTop || 0;

      this.isSticky = scrollTop > 300;
   }

   get_data() {
      this.api_s.postApi('site-config-get', '').then((resp: any) => {
         this.all_data = resp.data[0];
         this.cf.detectChanges();
      }, (err: any) => {
         //  this.isLoading = false;
      });
   }
   openVisulizer() {

      window.open(
         'https://visualizer.lamcart.com/app/sXklfsGvhp81LaB_JIHOYQ/room-select',
         '_blank'
      );
   }
}