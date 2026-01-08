import { Component, AfterViewInit } from '@angular/core';
import { FrontCommon } from '../../front-core/services/front-common';
declare var $: any;

@Component({
   selector: 'app-home',
   standalone: false,
   templateUrl: './home.html',
   styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
   products: any[] = [
      {
         category: 'first',
         image: 'img/front-img/portfolio-1.jpg',
         title: 'Light Oak',
         type: 'General Designs'
      },
      {
         category: 'second',
         image: 'img/front-img/portfolio-2.jpg',
         title: 'Dark Walnut',
         type: 'Custom Designs'
      },
      {
         category: 'first',
         image: 'img/front-img/portfolio-3.jpg',
         title: 'Grey Marble',
         type: 'General Designs'
      },
      {
         category: 'second',
         image: 'img/front-img/portfolio-4.jpg',
         title: 'Natural Teak',
         type: 'Custom Designs'
      },
      {
         category: 'first',
         image: 'img/front-img/portfolio-5.jpg',
         title: 'Olive Green',
         type: 'General Designs'
      },
      {
         category: 'second',
         image: 'img/front-img/portfolio-6.jpg',
         title: 'Soft Beige',
         type: 'Custom Designs'
      }
   ];

   activeFilter: string = 'all';

   constructor(
      public frontCommon: FrontCommon,
   ) {
   }

   ngAfterViewInit() {
      setTimeout(() => {
         $('.header-carousel').owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            items: 1,
            dots: true,
            loop: true,
            nav: true,
            navText: [
               '<i class="bi bi-chevron-left"></i>',
               '<i class="bi bi-chevron-right"></i>'
            ]
         });

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

         // var portfolioIsotope = $('.portfolio-container').isotope({
         //    itemSelector: '.portfolio-item',
         //    layoutMode: 'fitRows'
         // });

         // $('#portfolio-flters li').on('click', function () {
         //    $("#portfolio-flters li").removeClass('active');
         //    $(this).addClass('active');

         //    portfolioIsotope.isotope({ filter: $(this).data('filter') });
         // });
      }, 100);
   }

   setFilter(filter: string) {
      this.activeFilter = filter;
   }

   get filteredProducts() {
      if (this.activeFilter === 'all') {
         return this.products;
      }
      return this.products.filter(p => p.category === this.activeFilter);
   }

}