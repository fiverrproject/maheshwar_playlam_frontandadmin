import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globle } from '../../../core/services/globle';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

     constructor(
      private router: Router,
      public g_service:Globle
   ) {

    
   }

   ngOnInit(): void {
   }

   // goToPage(route: any) {
   //    this.router.navigate([route]);
   // }

}
