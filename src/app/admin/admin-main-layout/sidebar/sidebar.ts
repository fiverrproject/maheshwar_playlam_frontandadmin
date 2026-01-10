import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

     constructor(
      private router: Router,
   ) {

    
   }

   ngOnInit(): void {
   }

   goToPage(route: any) {
      this.router.navigate([route]);
   }

}
