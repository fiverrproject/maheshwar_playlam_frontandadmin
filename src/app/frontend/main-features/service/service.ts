import { Component, AfterViewInit } from '@angular/core';
import { FrontCommon } from '../../front-core/services/front-common';
declare var $: any;

@Component({
   selector: 'app-service',
   standalone: false,
   templateUrl: './service.html',
   styleUrl: './service.scss',
})
export class Service implements AfterViewInit{
   
   constructor(
      public frontCommon: FrontCommon,
   ) {
   }

   ngAfterViewInit() {
      setTimeout(() => {
         $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            dots: false,
            loop: true,
            nav: true,
            navText: [
               '<i class="bi bi-arrow-left"></i>',
               '<i class="bi bi-arrow-right"></i>'
            ],
            responsive: {
               0: {
                  items: 1
               },
               768: {
                  items: 2
               }
            }
         });
      }, 100);
   }
}