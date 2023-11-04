import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct, IProductFilters } from 'src/app/interfaces/product.interface';
import { IPagedList } from 'src/app/interfaces/shared.interface';
import * as moment from 'moment';

@Injectable()
export class ProductService {

    public pager!: IPagedList;

    constructor(private http: HttpClient) {}

    public loadData(filters: IProductFilters, sortCol = 'name', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<IProduct[]> {
        // Create required parameters
        let params: HttpParams = this.getParams(sortCol, sortOrder, pageNumber, pageSize);

        // Add filter parameters
        params = this.addFilters(filters, params);

        const url = '/api/products';
        const options = { params: params }
        const callBack = (product: IProduct) => ({
            ...product,
            is_variable: !!product.is_variable,
            is_green: !!product.is_green,
            is_tracker: !!product.is_tracker,
            is_prepay: !!product.is_prepay,
            is_business: !!product.is_business,
            is_restricted: !!product.is_restricted,
            available_from: new Date(product.available_from),
            available_to: product.available_to ? new Date(product.available_to) : null,
            created_at: new Date(product.created_at),
            updated_at: new Date(product.updated_at),
        });

        return this.http.get<IPagedList>(url, options).pipe(
            map((res: IPagedList) => {
                this.pager = res;
                const products: IProduct[] = res.data;
                return products.map(callBack);
            })
        );
    }

    public loadProductData(id: string, filters: IProductFilters, radius: number): Observable<IProduct[]> {
        let params: HttpParams = new HttpParams();

        const url = '/api/products/view/' + id;
        const options = { params: params }
        const callBack = (product: IProduct) => ({
            ...product,
            available_from: new Date(product.available_from),
            available_to: product.available_to ? new Date(product.available_to) : null,
            created_at: new Date(product.created_at),
            updated_at: new Date(product.updated_at),
        });
        return this.http.get<IProduct[]>(url, options).pipe(
            map((res: IProduct[]) => {
                return res.map(callBack);
            })
        );
    }

    public loadDataFromApi(roleId: string): Observable<any> {
        const url = `/api/products/store_from_api/${roleId}`;
        return this.http.post(url, {});
    }

    private getParams(sortCol: string, sortOrder: string, pageNumber: number, pageSize: number): HttpParams {
        return new HttpParams()
            .set('sortCol', sortCol)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString());
    }

    private addFilters(filters: IProductFilters, params: HttpParams): HttpParams {
        if (filters.code) { params = params.append('code', filters.code); }
        if (filters.direction) { params = params.append('direction', filters.direction); }
        if (filters.full_name) { params = params.append('full_name', filters.full_name); }
        if (filters.display_name) { params = params.append('display_name', filters.display_name); }
        if (filters.description) { params = params.append('description', filters.description); }
        if (filters.brand) { params = params.append('brand', filters.brand); }
        if (filters.is_variable) { params = params.append('is_variable', filters.is_variable); }
        if (filters.is_green) { params = params.append('is_green', filters.is_green); }
        if (filters.is_tracker) { params = params.append('is_tracker', filters.is_tracker); }
        if (filters.is_prepay) { params = params.append('is_prepay', filters.is_prepay); }
        if (filters.is_business) { params = params.append('is_business', filters.is_business); }
        if (filters.is_restricted) { params = params.append('is_restricted', filters.is_restricted); }
        if (filters.term) { params = params.append('term', filters.term); }
        if (filters.available_from) { params = params.append('available_from',  moment(filters.available_from).format('YYYY-MM-DD')); }
        if (filters.available_to) { params = params.append('available_to',  moment(filters.available_to).format('YYYY-MM-DD')); }
        return params;
    }
}
