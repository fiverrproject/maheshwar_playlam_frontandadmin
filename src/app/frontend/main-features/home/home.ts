import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FrontCommon } from '../../front-core/services/front-common';
import { Api } from '../../../core/services/api';
declare var $: any;

@Component({
   selector: 'app-home',
   standalone: false,
   templateUrl: './home.html',
   styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
   all_data: any[] = [];
   consonantal_data: any;
   filteredProducts: any[] = [];
   categories: any[] = [];
   activeCategoryId: any = 'all';
   is_loader = false;
   skip: number = 0;
   categories_all: any;
   activeFilter: string = 'all';

   constructor(
      public frontCommon: FrontCommon,
      public api_s: Api,
      private cf: ChangeDetectorRef,
   ) {
      this.get_data();
   }

   ngOnInit() {
      this.api_s.updateMetaInfo(
         'Home',
         'Lamcart is a trusted laminate showcase brand based in Gujarat, India, offering a wide range of **premium decorative laminates, interior laminates, and custom laminate designs**. We specialize in innovative **surface finishes, durable materials, and stylish solutions** for residential, commercial, and furniture applications. With a focus on quality, aesthetics, and functionality, Lamcart helps architects, interior designers, and homeowners bring modern spaces to life.',
         'home'
      )
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

      }, 200);
   }

   // Active category ID
   noProductsMessage: string = '';
   setFilter(categoryId: number | 'all'): void {
      this.activeCategoryId = categoryId;
      const body = {
         skip: 0,
         category_id: this.activeCategoryId == 'all' ? 0 : this.activeCategoryId
      }
      this.all_data = [];
      this.noProductsMessage = '';
      if (categoryId === 'all') {
         this.get_product(body);

      } else {
         this.get_product(body);
         this.noProductsMessage = '';
      }
   }

   get_product(body: any) {
      this.is_loader = true;
      this.api_s.postApi('product-page-get', body).then((resp: any) => {
         this.is_loader = false;
         if (resp.status) {
            this.all_data.push(...resp.data);
            this.categories = this.getCategories(this.all_data);
            this.total = resp.total;
         
            if (this.all_data.length === 0) {
               this.noProductsMessage = 'No products found for this category.';
            }
         }

         this.cf.detectChanges();
      }, (err: any) => {});
   }

   total: any;
   load_more() {
      const body = {
         skip: this.all_data.length,
         category_id: this.activeCategoryId == 'all' ? 0 : this.activeCategoryId
      }
      this.get_product(body);
   }

   get_data() {
      // product-get
      this.api_s.postApi('categories-get', '').then((resp: any) => {
         this.categories_all = resp.data;
         this.cf.detectChanges();

      }, (err: any) => {

      });

      const body = {
         skip: this.skip,
         category_id: ''
      }
      this.get_product(body);

      // product-get
      this.api_s.postApi('consonantal-get', '').then((resp: any) => {
         this.consonantal_data = resp.data;
         this.cf.detectChanges();
      }, (err: any) => {

      });
   }

   getCategories(products: any[]) {
      const map: any = {};
      products.forEach(p => map[p.category_id] = p.category_name);
      return Object.keys(map).map(id => ({ id: +id, name: map[id] }));
   }




}