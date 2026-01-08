import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing-module';
import { MainLayout } from './main-layout/main-layout';
import { Header } from './main-layout/header/header';
import { Footer } from './main-layout/footer/footer';
import { Home } from './main-features/home/home';
import { About } from './main-features/about/about';
import { Contact } from './main-features/contact/contact';
import { Service } from './main-features/service/service';
import { Products } from './main-features/products/products';
import { CounterUp } from './front-core/directives/counter-up';

@NgModule({
   declarations: [
      MainLayout,
      Header,
      Footer,
      Home,
      About,
      Contact,
      Service,
      Products,
      CounterUp
   ],
   imports: [
      CommonModule,
      FrontendRoutingModule,
   ]
})
export class FrontendModule { }