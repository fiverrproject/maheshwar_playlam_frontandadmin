import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminMainLayout } from './admin-main-layout/admin-main-layout';
import { Footer } from './admin-main-layout/footer/footer';
import { Header } from './admin-main-layout/header/header';
import { Sidebar } from './admin-main-layout/sidebar/sidebar';
import { Dashboard } from './admin-main-features/dashboard/dashboard';
import { ContactList } from './admin-main-features/contact-list/contact-list';
import { Login } from './auth/login/login';
import { SiteConfig } from './admin-main-features/site-config/site-config';
import { Consultant } from './admin-main-features/consultant/consultant';
import { ReactiveFormsModule } from '@angular/forms';
import { Categorie } from './admin-main-features/categorie/categorie';
import { Product } from './admin-main-features/product/product';
import { share } from 'rxjs';
import { ShereModule } from '../core/shere/shere-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChangePassd } from './admin-main-features/change-passd/change-passd';
import { LamPdf } from './admin-main-features/lam-pdf/lam-pdf';
import { Testimonial } from './admin-main-features/testimonial/testimonial';


@NgModule({
   declarations: [
      AdminMainLayout,
      Footer,
      Header,
      Sidebar,
      Dashboard,
      ContactList,
      Login,
      SiteConfig,
      Consultant,
      Categorie,
      Product,
      ChangePassd,
      LamPdf,
      Testimonial
   ],
   imports: [
      CommonModule,
      AdminRoutingModule,
      ReactiveFormsModule,
      ShereModule,
      NgxPaginationModule
   ]
})
export class AdminModule { }
