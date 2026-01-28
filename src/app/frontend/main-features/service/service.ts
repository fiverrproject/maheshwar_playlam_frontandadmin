import { Component, AfterViewInit } from '@angular/core';
import { FrontCommon } from '../../front-core/services/front-common';
import { Api } from '../../../core/services/api';
declare var $: any;

@Component({
   selector: 'app-service',
   standalone: false,
   templateUrl: './service.html',
   styleUrl: './service.scss',
})
export class Service implements AfterViewInit {

   constructor(
      public frontCommon: FrontCommon,
      public api_s: Api
   ) {
   }

   ngOnInit() {
      this.api_s.updateMetaInfo(
         'Services',
         'Lamcart offers professional **project assistance** to support architects, interior designers, and contractors from concept to completion. Our team provides material guidance, design suggestions, and technical support to ensure seamless execution and timely delivery of laminate solutions for all project scales.',
         'service'
      )
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