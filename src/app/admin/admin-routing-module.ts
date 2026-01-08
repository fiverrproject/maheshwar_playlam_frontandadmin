import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactList } from './admin-main-features/contact-list/contact-list';
import { Dashboard } from './admin-main-features/dashboard/dashboard';
import { AdminMainLayout } from './admin-main-layout/admin-main-layout';
import { Login } from './auth/login/login';

const routes: Routes = [
   {
      path: 'features',
      component: AdminMainLayout,
      children: [
         { path: 'dashboard', component: Dashboard },
         { path: 'contact-list', component: ContactList },
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