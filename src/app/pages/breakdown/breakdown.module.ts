import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakdownComponent } from './breakdown/breakdown.component';
import { TrendModule } from 'ngx-trend';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    BreakdownComponent
  ],
  imports: [
    CommonModule,
    TrendModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    SharedModule,
    DialogModule,
    UploaderModule,
    CheckBoxModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BreakdownModule { }
