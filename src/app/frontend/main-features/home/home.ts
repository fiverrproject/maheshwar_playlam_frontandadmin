import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FrontCommon } from '../../front-core/services/front-common';
import { Api } from '../../../core/services/api';
declare var $: any;

@Component({
   selector: 'app-home',
   standalone: false,
   templateUrl: './home.html',
   styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
   all_data: any;
   consonantal_data: any;
   filteredProducts: any[] = [];
   categories: any[] = [];
   activeCategoryId: any = 'all';


   // products: any[] = [
   //    {
   //       category: 'first',
   //       image: 'img/front-img/portfolio-1.jpg',
   //       title: 'Light Oak',
   //       type: 'General Designs'
   //    },
   //    {
   //       category: 'second',
   //       image: 'img/front-img/portfolio-2.jpg',
   //       title: 'Dark Walnut',
   //       type: 'Custom Designs'
   //    },
   //    {
   //       category: 'first',
   //       image: 'img/front-img/portfolio-3.jpg',
   //       title: 'Grey Marble',
   //       type: 'General Designs'
   //    },
   //    {
   //       category: 'second',
   //       image: 'img/front-img/portfolio-4.jpg',
   //       title: 'Natural Teak',
   //       type: 'Custom Designs'
   //    },
   //    {
   //       category: 'first',
   //       image: 'img/front-img/portfolio-5.jpg',
   //       title: 'Olive Green',
   //       type: 'General Designs'
   //    },
   //    {
   //       category: 'second',
   //       image: 'img/front-img/portfolio-6.jpg',
   //       title: 'Soft Beige',
   //       type: 'Custom Designs'
   //    }
   // ];

   activeFilter: string = 'all';

   constructor(
      public frontCommon: FrontCommon,
      public api_s: Api,
      private cf: ChangeDetectorRef) {
      this.get_data();
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


   ngOnInit() {
   }


   // setFilter(categoryId: any) {
   //    this.activeCategoryId = categoryId;
   //    if (categoryId === 'all') {
   //       this.filteredProducts = this.all_data;
   //       console.log("::::: filteredProducts",this.filteredProducts)
   //    } else {
   //       this.filteredProducts = this.all_data.filter((p: any) => p.category_id === categoryId);
   //    }
   // }

   // Active category ID
   noProductsMessage: string = '';
   setFilter(categoryId: number | 'all'): void {
      this.activeCategoryId = categoryId;

      // Filter products based on selected category
      if (categoryId === 'all') {
         this.filteredProducts = this.all_data;
         this.noProductsMessage = '';
      } else {
         this.filteredProducts = this.all_data.filter((product: any) => product.category_id === categoryId);
         this.noProductsMessage = this.filteredProducts.length === 0 ? 'No products found for this category.' : '';
      }
   }

   categories_all: any;
   get_data() {
      // product-get
      this.api_s.postApi('categories-get', '').then((resp: any) => {
         this.categories_all = resp.data;
         console.log(":::all c", this.categories_all);
         this.cf.detectChanges();

      }, (err: any) => {

      });

      this.api_s.postApi('product-get', '').then((resp: any) => {
         this.all_data = resp.data;
         this.categories = this.getCategories(this.all_data);
         console.log(":::p", this.all_data);
         this.filteredProducts = this.all_data;
         this.cf.detectChanges();

      }, (err: any) => {

      });

      // product-get
      this.api_s.postApi('consonantal-get', '').then((resp: any) => {
         this.consonantal_data = resp.data;
         this.cf.detectChanges();
      }, (err: any) => {
         // this.isLoading = false;

      });
   }

   getCategories(products: any[]) {
      const map: any = {};
      products.forEach(p => map[p.category_id] = p.category_name);
      return Object.keys(map).map(id => ({ id: +id, name: map[id] }));
   }



}