import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { IProduct, IProductFilters } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

export class ProductDataSource implements DataSource<IProduct> {

    private productsSubject = new BehaviorSubject<IProduct[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private productService: ProductService) {}

    public connect(collectionViewer: CollectionViewer): Observable<IProduct[]> {
        return this.productsSubject.asObservable();
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }

    public loadData(filters: IProductFilters, sortCol = 'name', sortOrder = 'asc', pageNumber = 0, pageSize = 10): void {
        if (sortCol === 'primary_role') {
            sortCol = 'roles.display_name';
        }
        this.loadingSubject.next(true);
        this.productService
            .loadData(filters, sortCol, sortOrder, pageNumber, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(products => {
                return this.productsSubject.next(products);
            });
    }
}
