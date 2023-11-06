import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss'],
    providers: [ProductService],
})
export class ProductViewComponent implements OnInit, OnDestroy {

    public id: string = '';
    public product$: Observable<IProduct> = new Observable<IProduct>();
    public product: IProduct = {} as IProduct;
    public loadingData = false;

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        readonly productService: ProductService,
    ) {
    }

    public ngOnInit(): void {
        this.setId();
    }

    public ngOnDestroy(): void {
        this.subscriptions.map((sub: Subscription) => sub.unsubscribe())
    }

    private setId(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id') as string;
            this.loadData();
        });
    }

    private loadData(): void {
        this.loadingData = true;
        this.product$ = this.productService.loadProductData(this.id);
        const sub: Subscription = this.product$.subscribe((res: IProduct) => {
            this.product = res;
            this.loadingData = false;
        });
        this.subscriptions.push(sub);
    }
}
