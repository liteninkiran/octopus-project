import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { IProductFilterFormGroup, IProductFilters } from 'src/app/interfaces/product.interface';
import { IFilterConfig } from 'src/app/interfaces/shared.interface';

@Component({
    selector: 'app-product-filters',
    templateUrl: './product-filters.component.html',
    styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent {

    @Input() public message: string = '';
    @Input() public defaultFilters: IProductFilters = {} as IProductFilters;

    @Output() public filtersChanged = new EventEmitter<IProductFilters>();

    // Form
    public filterForm!: FormGroup;

    // Form Controls
    public filterFormControls: any;

    // Config
    public appliedFilters: IFilterConfig[] = [];
    public filterText: string = '';
    public maxDate: Date = new Date();

    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('en-GB');
    }

    public ngOnInit(): void {
        this.setFilterFormGroup();
        this.calculateFilter(this.filterForm.value);
        this.filtersChanged.emit(this.filterForm.value);
    }

    public onCodeInput(event: Event): void {
        this.changeToUpperCase(this.filterFormControls.code);
    }

    public onDirectionInput(event: Event): void {
        this.changeToUpperCase(this.filterFormControls.direction);
    }

    public onBrandInput(event: Event): void {
        this.changeToUpperCase(this.filterFormControls.brand);
    }

    private changeToUpperCase(input: any) {
        if (input.value) {
            input.setValue(input.value.toUpperCase());
        }
    }

    private setFilterFormGroup(): void {
        this.filterFormControls = this.getFilterFormControls();
        this.filterForm = new FormGroup(this.filterFormControls);
        this.filterForm.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap((value: IProductFilters) => {
                this.calculateFilter(value);
                this.filtersChanged.emit(value);
            })
        ).subscribe();
    }

    private calculateFilter(value: IProductFilters): void {
        this.appliedFilters = [];
        Object.keys(value).map((key) => {
            if (value[key as keyof IProductFilters] !== null) {
                this.appliedFilters.push({ field: key, value: value[key as keyof IProductFilters] });
            }
        });
        const suffix = this.appliedFilters.length === 1 ? '' : 's';
        this.filterText = this.appliedFilters.length === 0 ? '' : this.appliedFilters.length + ' Filter' + suffix + ' Applied';
    }

    private getFilterFormControls(): IProductFilterFormGroup {
        return {
            code            : new FormControl(this.defaultFilters.code),
            direction       : new FormControl(this.defaultFilters.direction),
            full_name       : new FormControl(this.defaultFilters.full_name),
            display_name    : new FormControl(this.defaultFilters.display_name),
            description     : new FormControl(this.defaultFilters.description),
            brand           : new FormControl(this.defaultFilters.brand),
            is_variable     : new FormControl(this.defaultFilters.is_variable),
            is_green        : new FormControl(this.defaultFilters.is_green),
            is_tracker      : new FormControl(this.defaultFilters.is_tracker),
            is_prepay       : new FormControl(this.defaultFilters.is_prepay),
            is_business     : new FormControl(this.defaultFilters.is_business),
            is_restricted   : new FormControl(this.defaultFilters.is_restricted),
            term            : new FormControl(this.defaultFilters.term),
            available_on    : new FormControl(this.defaultFilters.available_on),
        }
    }
}
