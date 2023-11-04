import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        ProductRoutingModule,
        CommonModule,
        RouterModule,
        SharedModule,
    ],
    declarations: [
        ProductComponent,
    ]
})
export class ProductModule {}
