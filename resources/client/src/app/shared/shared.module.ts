import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/modules/material.module';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxMenuComponent } from './checkbox-menu/checkbox-menu.component';
import { PipeModule } from '../modules/pipe.module';

@NgModule({
    declarations: [
        TableComponent,
        ButtonComponent,
        CheckboxMenuComponent,
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
    ],
})
export class SharedModule { }
