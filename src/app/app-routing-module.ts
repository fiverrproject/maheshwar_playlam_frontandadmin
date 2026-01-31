import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: 'lamcartAdmin',
      loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)
   },
   {
      path: '',
      loadChildren: () => import('./frontend/frontend-module').then(m => m.FrontendModule)
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }