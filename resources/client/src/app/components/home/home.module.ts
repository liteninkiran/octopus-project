import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        RouterModule,
    ],
    declarations: [
        HomeComponent,
    ]
})
export class HomeModule {}
