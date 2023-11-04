import { FormControl } from '@angular/forms';

export interface IProduct {
    id: number;
    code: string;
    direction: string;
    full_name: string;
    display_name: string;
    description: string | null;
    brand: string;
    is_variable: boolean;
    is_green: boolean;
    is_tracker: boolean;
    is_prepay: boolean;
    is_business: boolean;
    is_restricted: boolean;
    term: number | null;
    available_from: Date;
    available_to: Date | null;
    created_at: Date;
    updated_at: Date;
};

export interface IProductFilters {
    code: string | null;
    direction: string | null;
    full_name: string | null;
    display_name: string | null;
    description: string | null;
    brand: string | null;
    is_variable: boolean | null;
    is_green: boolean | null;
    is_tracker: boolean | null;
    is_prepay: boolean | null;
    is_business: boolean | null;
    is_restricted: boolean | null;
    term: number | null;
    available_from: Date | null;
    available_to: Date | null;
};

export interface IProductFilterFormGroup {
    code: FormControl<string | null>;
    direction: FormControl<string | null>;
    full_name: FormControl<string | null>;
    display_name: FormControl<string | null>;
    description: FormControl<string | null>;
    brand: FormControl<string | null>;
    is_variable: FormControl<boolean | null>;
    is_green: FormControl<boolean | null>;
    is_tracker: FormControl<boolean | null>;
    is_prepay: FormControl<boolean | null>;
    is_business: FormControl<boolean | null>;
    is_restricted: FormControl<boolean | null>;
    term: FormControl<number | null>;
    available_from: FormControl<Date | null>;
    available_to: FormControl<Date | null>;
};
