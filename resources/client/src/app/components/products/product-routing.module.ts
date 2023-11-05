import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
    {
        path: 'products',
        component: ProductComponent,
    },
    {
        path: 'products/:id',
        component: ProductViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule { }
