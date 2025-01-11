import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PortalComponent } from './portal.component';
import { SettingsComponent } from './features/settings/settings.component';
import { SalaeforceComponent } from './features/salaeforce/salaeforce.component';
import { AuthActivateChildGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    canActivateChild: [AuthActivateChildGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'tasklists',
        loadChildren: () => import('./features/tasklist/tasklist.module').then(m => m.TasklistModule)
      },
      {
        path: 'saleforce',
        component: SalaeforceComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
