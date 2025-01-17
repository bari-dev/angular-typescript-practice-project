import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthActivateGuard } from './guards/auth.guard';
import { SubdomainService } from './core/services/subdomain.service';
import { PublicAuthGuard } from './guards/public-auth.guard';
import { SubLoginComponent } from './subdomain/sub-login/sub-login.component';
import { TasksComponent } from './subdomain/tasks/tasks.component';

const routes: Routes = window.location.hostname.split('.').length > 1 ?
  [
    {
      path: '',
      title: window.location.hostname.split('.')[0].split('-').join(' '),
      component: SubLoginComponent,
    },
    {
      path: 'tasks',
      title: 'Tasks',
      component: TasksComponent,
      children: [
      ]
    },
    { path: "**", redirectTo: "" }
  ]
  : [
    {
      path: '',
      title: 'Public',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    },
    {
      path: 'dashboard',
      title: 'Dashboard',
      loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule),
      canActivate: [AuthActivateGuard],
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private subdomainService: SubdomainService) {}
}
