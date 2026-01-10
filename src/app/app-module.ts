import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ShereModule } from './core/shere/shere-module';
import { provideAnimations } from '@angular/platform-browser/animations';
@NgModule({
   declarations: [
      App
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
       HttpClientModule,
       ReactiveFormsModule,
        ShereModule   
   ],
   providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideAnimations()  
   ],
   bootstrap: [App]
})
export class AppModule { }
