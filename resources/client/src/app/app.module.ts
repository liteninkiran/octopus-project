// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { NavbarLinksComponent } from './components/navbar/navbar-links.component';
import { HomeComponent } from './components/home/home.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { ProductModule } from './components/products/product.module';
import { HomeModule } from './components/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        NavbarLinksComponent,
    ],
    imports: [
        // Core Modules
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,

        // Routing
        AppRoutingModule,

        // Shared Modules
        MaterialModule,

        // Feature Modules
        HomeModule,
        ProductModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
