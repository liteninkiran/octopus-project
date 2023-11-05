import { Component, OnInit } from '@angular/core';
import { IAsyncButtonInputConfig, IMatTableColumnConfig, IPaginatorConfig } from 'src/app/interfaces/shared.interface';
import { ProductService } from '../../../services/product/product.service';
import { IProductFilters } from 'src/app/interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataSource } from '../product.data-source';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ProductService],
})
export class ProductComponent implements OnInit {
    public filters: IProductFilters = {} as IProductFilters;
    public defaultFilters: IProductFilters = { available_on: new Date() } as IProductFilters;
    public dataSource!: ProductDataSource;
    public columnConfig: IMatTableColumnConfig[] = [];
    public actionButtonConfig: IAsyncButtonInputConfig = {
        buttonText: '',
        colour: 'primary',
        icon: 'visibility',
        loaded: true,
        hide: true,
        hideRow: 'primary_role',
    }
    public paginatorConfig: IPaginatorConfig = {
        pageSizeOptions: [5, 10, 20, 50, 100],
        intialPageSize: 10,
        showFirstLastButtons: true,
        hidePageSize: false,
        disabled: false,
    }

    constructor(
        readonly productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this.dataSource = new ProductDataSource(this.productService);
        this.columnConfig = this.columnConfigData();
    }

    public updateFilters(filters: any): void {
        this.filters = filters;
    }

    public onActionButtonClick(id: number): void {
        alert(id);
    }

    public onRowClick(row: any): void {
        this.router.navigate([row.code], { relativeTo: this.route });
    }

    private columnConfigData(): IMatTableColumnConfig[] {
        return [
            { columnId: 'code', columnName: 'Code', visible: true },
            { columnId: 'full_name', columnName: 'Full Name', visible: false },
            { columnId: 'display_name', columnName: 'Display Name', visible: true },
            { columnId: 'description', columnName: 'Description', visible: false },
            { columnId: 'term', columnName: 'Term', visible: true },
            { columnId: 'available_from', columnName: 'Available From', visible: true },
            { columnId: 'available_to', columnName: 'Available To', visible: true },
            { columnId: 'brand', columnName: 'Brand', visible: true },
            { columnId: 'direction', columnName: 'Direction', visible: true },
            { columnId: 'is_variable', columnName: 'Is Variable', visible: false },
            { columnId: 'is_green', columnName: 'Is Green', visible: false },
            { columnId: 'is_tracker', columnName: 'Is Tracker', visible: false },
            { columnId: 'is_prepay', columnName: 'Is Prepay', visible: false },
            { columnId: 'is_business', columnName: 'Is Business', visible: false },
            { columnId: 'is_restricted', columnName: 'Is Restricted', visible: false },
        ];
    }
}
