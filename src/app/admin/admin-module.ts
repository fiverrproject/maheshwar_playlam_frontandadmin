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


@NgModule({
   declarations: [
      AdminMainLayout,
      Footer,
      Header,
      Sidebar,
      Dashboard,
      ContactList,
      Login
   ],
   imports: [
      CommonModule,
      AdminRoutingModule
   ]
})
export class AdminModule { }
