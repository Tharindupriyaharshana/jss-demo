import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoboticcellComponent } from './roboticcell/roboticcell.component';
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


import {  ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { NumericTextBoxAllModule, TextBoxAllModule, MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ToolbarAllModule, ContextMenuAllModule, TreeViewModule, AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';

import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, PrintService } from '@syncfusion/ej2-angular-schedule';


@NgModule({
  declarations: [
    RoboticcellComponent
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
    ReactiveFormsModule,

    ScheduleAllModule,
    RecurrenceEditorAllModule,
    NumericTextBoxAllModule,
    TextBoxAllModule,
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    ToolbarAllModule,
    DropDownListAllModule,
    ContextMenuAllModule,
    MaskedTextBoxModule,
    UploaderAllModule,
    MultiSelectAllModule,
    TreeViewModule,
    ButtonAllModule,
    DropDownButtonAllModule,
    SwitchAllModule,
    ToastAllModule,
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService,
    PrintService
    // Other providers
  ]
})
export class RoboticcellModule { }
