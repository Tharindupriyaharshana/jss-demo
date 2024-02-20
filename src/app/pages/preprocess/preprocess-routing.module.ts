import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PreprocessComponent } from './preprocess/preprocess.component';

const routes: Routes = [
  {
    path: '',
    component: PreprocessComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PreprocessModuleRoutingModule {
}
