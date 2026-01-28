import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../../../core/services/api';

@Component({
   selector: 'app-products',
   standalone: false,
   templateUrl: './products.html',
   styleUrl: './products.scss',
})
export class Products {
   all_data: any[] = [];
   activeFilter: string = 'all';

   constructor(public api_s: Api,
      private cf: ChangeDetectorRef) {
      this.get_data();
   }

   filteredProducts: any[] = [];
   categories: any[] = [];
   activeCategoryId: any = 'all';
   skip: number = 0;
   categories_all: any;
   total: any;

   ngOnInit() {
      this.api_s.updateMetaInfo(
         'Products',
         ' We provide custom laminate design solutions tailored to your unique project requirements. Lamcart collaborates closely with architects, designers, and manufacturers to create bespoke patterns, textures, and finishes that match your vision. Our customization ensures exclusivity, precision, and brand identity in every project',
         'products'
      )
   }

   getCategories(products: any[]) {
      const map: any = {};
      products.forEach(p => map[p.category_id] = p.category_name);
      return Object.keys(map).map(id => ({ id: +id, name: map[id] }));
   }


   noProductsMessage: string = '';
   is_loader = false;
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

      }, (err: any) => {

      });
   }

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
      
   }

}