import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent
  },
  {
    path: 'typography',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/typography/typography.module').then(m => m.TypographyModule)
  },
  {
    path: 'breakdown',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'schedule',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/scheduler-plan/scheduler-routing.module').then(m => m.SchedulerPlanRoutingModule)
  },
  {
    path: 'upload',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/uploadfile/upload/upload-routing.module').then(m => m.UploadRoutingModule)
  },
  {
    path: 'roboticcell',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/roboticcell/roboticcell-routing.module').then(m => m.RoboticCellRoutingModule)
  },
  {
    path: 'preprocess',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/preprocess/preprocess-routing.module').then(m => m.PreprocessModuleRoutingModule)
  },
  {
    path: 'breakdown2',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/breakdown/breakdown-routing.module').then(m => m.BreakdownRoutingModule)
  },
  {
    path: 'notification',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'ui',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/ui-elements/ui-elements.module').then(m => m.UiElementsModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
