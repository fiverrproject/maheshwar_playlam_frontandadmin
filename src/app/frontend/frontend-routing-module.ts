import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './main-features/about/about';
import { Contact } from './main-features/contact/contact';
import { Home } from './main-features/home/home';
import { Products } from './main-features/products/products';
import { Service } from './main-features/service/service';
import { MainLayout } from './main-layout/main-layout';

const routes: Routes = [
   {
      path: '',
      component: MainLayout,
      children: [
         { path: 'home', component: Home },
         { path: 'about', component: About },
         { path: 'contact', component: Contact },
         { path: 'service', component: Service },
         { path: 'products', component: Products },
         { path: '', redirectTo: '/home', pathMatch: 'full' }
      ]
   },
   
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class FrontendRoutingModule { }