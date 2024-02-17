import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SchedulerPlanComponent } from './scheduler-plan.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerPlanComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SchedulerPlanRoutingModule {
}
