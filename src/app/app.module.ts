import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './pages/auth/auth.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { SchedulerPlanModule } from './pages/scheduler-plan/scheduler-plan.module';
import { HttpClientModule } from '@angular/common/http';
import { UploadfileModule } from './pages/uploadfile/uploadfile.module';
import { RoboticcellModule } from './pages/roboticcell/roboticcell.module';
import { PreprocessModule } from './pages/preprocess/preprocess.module';
import { BreakdownModule } from './pages/breakdown/breakdown.module';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    UploadfileModule,
    SchedulerPlanModule,
    HttpClientModule,
    RoboticcellModule,
    PreprocessModule,
    BreakdownModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
