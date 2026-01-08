import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.html',
   standalone: false,
   styleUrl: './app.scss'
})
export class App implements OnInit {
   showSpinner: boolean = true;

   ngOnInit() {
      setTimeout(() => {
         this.showSpinner = false;
      }, 1);
   }
}
