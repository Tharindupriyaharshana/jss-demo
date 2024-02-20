import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BreakdownComponent } from './breakdown/breakdown.component';

const routes: Routes = [
  {
    path: '',
    component: BreakdownComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class BreakdownRoutingModule {
}
