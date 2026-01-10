import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ToastrModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ShereModule { }
