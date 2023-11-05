import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/modules/material.module';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxMenuComponent } from './checkbox-menu/checkbox-menu.component';
import { PipeModule } from '../modules/pipe.module';
import { SelectComponent } from './select/select.component';

@NgModule({
    declarations: [
        TableComponent,
        ButtonComponent,
        CheckboxMenuComponent,
        SelectComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        PipeModule,
    ],
    exports: [
        TableComponent,
        ButtonComponent,
        CheckboxMenuComponent,
        SelectComponent,
    ],
})
export class SharedModule { }
