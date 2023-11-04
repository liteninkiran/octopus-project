import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        ProductRoutingModule,
        CommonModule,
        RouterModule,
    ],
    declarations: [
        ProductComponent,
    ]
})
export class ProductModule {}
