import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../../../core/services/api';

@Component({
   selector: 'app-products',
   standalone: false,
   templateUrl: './products.html',
   styleUrl: './products.scss',
})
export class Products {
   all_data: any;
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

   // setFilter(filter: string) {
   //    this.activeFilter = filter;
   // }

   // get filteredProducts() {
   //    if (this.activeFilter === 'all') {
   //       return this.products;
   //    }
   //    return this.products.filter(p => p.category === this.activeFilter);
   // }





   constructor(public api_s: Api,
      private cf: ChangeDetectorRef) {
      this.get_data();
   }

   filteredProducts: any[] = [];
   categories: any[] = [];
   activeCategoryId: any = 'all';

   ngOnInit() {
      // Replace with your actual API data



   }

   getCategories(products: any[]) {
      const map: any = {};
      products.forEach(p => map[p.category_id] = p.category_name);
      return Object.keys(map).map(id => ({ id: +id, name: map[id] }));
   }


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
         // console.log(":::::categories",this.categories);
         this.filteredProducts = this.all_data;
         this.cf.detectChanges();
         // console.log(":::::", this.all_data);
      }, (err: any) => {
         // this.isLoading = false;
      });
   }

}