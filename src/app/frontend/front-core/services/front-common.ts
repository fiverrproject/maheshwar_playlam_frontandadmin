import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class FrontCommon {

   testimonial: any[] = [
      {
         image: 'img/front-img/testimonial-1.jpg',
         clientName: 'Amit Patel',
         profession: 'Interior Designer',
         description: 'The laminate quality is excellent and the finish looks premium. Easy to work with and perfect for modern interiors.'
      },
      {
         image: 'img/front-img/testimonial-2.jpg',
         clientName: 'Neha Shah',
         profession: 'Home Owner',
         description: 'Very happy with the design options and overall quality. The laminates completely changed the look of our home.'
      },
      {
         image: 'img/front-img/testimonial-3.jpg',
         clientName: 'Rakesh Mehta',
         profession: 'Furniture Manufacturer',
         description: 'Consistent quality and great surface finish. These laminates are reliable and easy to use for custom furniture.'
      },
      {
         image: 'img/front-img/testimonial-4.jpg',
         clientName: 'Pooja Desai',
         profession: 'Architect',
         description: 'Clean designs, durable material, and a premium feel. A great choice for both residential and commercial projects.'
      },
      {
         image: 'img/front-img/testimonial-5.jpg',
         clientName: 'Kunal Jain',
         profession: 'Contractor',
         description: 'Good thickness, strong bonding, and stylish textures. Clients are always satisfied with the final results.'
      },
      {
         image: 'img/front-img/testimonial-6.jpg',
         clientName: 'Sneha Verma',
         profession: 'Interior Consultant',
         description: 'Wide range of colors and finishes. Perfect balance of design and durability.'
      }
   ];
}