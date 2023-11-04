// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        // Core Modules
        BrowserModule,
        BrowserAnimationsModule,

        // Routing
        AppRoutingModule,

        // Shared Modules
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
