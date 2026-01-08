import { Component } from '@angular/core';

@Component({
   selector: 'app-products',
   standalone: false,
   templateUrl: './products.html',
   styleUrl: './products.scss',
})
export class Products {
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