import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactList } from './admin-main-features/contact-list/contact-list';
import { Dashboard } from './admin-main-features/dashboard/dashboard';
import { AdminMainLayout } from './admin-main-layout/admin-main-layout';
import { Login } from './auth/login/login';
import { SiteConfig } from './admin-main-features/site-config/site-config';
import { Consultant } from './admin-main-features/consultant/consultant';
import { Categorie } from './admin-main-features/categorie/categorie';
import { Product } from './admin-main-features/product/product';

const routes: Routes = [
   {
      path: 'features',
      component: AdminMainLayout,
      children: [
         { path: 'dashboard', component: Dashboard },
         { path: 'contact-list', component: ContactList },
         { path: 'site-config', component: SiteConfig },
         { path: 'consultant', component: Consultant },
         { path: 'categorie', component: Categorie },
         { path: 'product', component: Product },
        
         { path: '', redirectTo: '/lamcartAdmin/features/dashboard', pathMatch: 'full' }
      ]
   },
   {
      path: 'login',
      component: Login
   },
   { path: '', redirectTo: '/lamcartAdmin/login', pathMatch: 'full' }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AdminRoutingModule { }