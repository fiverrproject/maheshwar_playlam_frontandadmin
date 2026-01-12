import { Component } from '@angular/core';
import { Globle } from '../../../core/services/globle';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
 
  constructor(
    public g_Service:Globle
  ){
    
  }
}
