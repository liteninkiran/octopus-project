// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { ProductComponent } from './product/product.component';

// Modules
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { PipeModule } from 'src/app/modules/pipe.module';

@NgModule({
    imports: [
        // Angular
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,

        // Custom
        ProductRoutingModule,
        MaterialModule,
        PipeModule,
    ],
    declarations: [
        ProductComponent,
        ProductFiltersComponent,
    ]
})
export class ProductModule {}
