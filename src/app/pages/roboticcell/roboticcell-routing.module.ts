import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RoboticcellComponent } from './roboticcell/roboticcell.component';

const routes: Routes = [
  {
    path: '',
    component: RoboticcellComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class RoboticCellRoutingModule {
}
