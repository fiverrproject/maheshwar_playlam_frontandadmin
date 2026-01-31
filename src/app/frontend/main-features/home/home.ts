import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FrontCommon } from '../../front-core/services/front-common';
import { Api } from '../../../core/services/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globle } from '../../../core/services/globle';
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
   inquiryForm!: FormGroup;
   inquiry_data: any;
   submitted = false;
   testimonial: any[] = [];
   pdf_all_Data: any;


   constructor(
      public frontCommon: FrontCommon,
      public api_s: Api,
      private cf: ChangeDetectorRef,
      private fb: FormBuilder,
      public globle_s: Globle
   ) {
      this.get_data();
      this.get_testimonial();
      this.get_Pdf()
   }

   ngOnInit() {
      this.api_s.updateMetaInfo(
         'Home',
         'Lamcart is a trusted laminate showcase brand based in Gujarat, India, offering a wide range of **premium decorative laminates, interior laminates, and custom laminate designs**. We specialize in innovative **surface finishes, durable materials, and stylish solutions** for residential, commercial, and furniture applications. With a focus on quality, aesthetics, and functionality, Lamcart helps architects, interior designers, and homeowners bring modern spaces to life.',
         'home'
      )
      this.inquiryForm = this.fb.group({
         name: ['', Validators.required],
         email: [''],
         mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
         subject: ['',],
         message: ['',]
      });
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
   initTestimonialCarousel() {
      const $el = $('.testimonial-carousel');
      const itemCount = $el.find('.testimonial-item').length;

      if ($el.hasClass('owl-loaded')) {
         $el.trigger('destroy.owl.carousel');
         $el.removeClass('owl-loaded owl-hidden');
         $el.find('.owl-stage-outer').children().unwrap();
      }

      setTimeout(() => {
         $el.owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            dots: false,
            // yahan condition: sirf tab loop jab 2+ items hon
            loop: itemCount > 1,
            nav: true,
            navText: [
               '<i class="bi bi-arrow-left"></i>',
               '<i class="bi bi-arrow-right"></i>'
            ],
            responsive: {
               0: { items: 1 },
               768: { items: 2 }
            }
         });
      }, 0);
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
      }, (err: any) => { });
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

   onSubmit() {
      this.submitted = true;

      if (this.inquiryForm.valid) {
         this.api_s.postApi('inquiry-add', this.inquiryForm.value).then((resp: any) => {
            this.inquiry_data = resp.data;
            this.submitted = false;
            this.inquiryForm.reset();
            this.globle_s.showToastr('Success', resp?.message);

         }, (err: any) => {
            this.globle_s.showToastr('Error', 'Not Found data');
            //  this.isLoading = false;
         });
      }

   }
   get_testimonial() {
      this.api_s.postApi('testimonial-get', '').then((resp: any) => {
         if (resp.status) {
            this.testimonial = resp.data;
            this.cf.detectChanges();
            this.initTestimonialCarousel();
         }
      }, (err: any) => {
         console.log(err);
      });
   }
   get_Pdf() {
      this.api_s.postApi('lam-pdf-get', '').then((resp: any) => {
         this.pdf_all_Data = resp.data;
      }, (err: any) => {
         console.log(err);
      });
   }
   openPdf(pdfName: string) {
      const url = this.api_s.imageBaseUrl + 'pdfPath/' + pdfName;
      window.open(url, '_blank');
   }

}