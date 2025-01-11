import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthActivateGuard } from './guards/auth.guard';
import { SubdomainService } from './core/services/subdomain.service';
import { PublicAuthGuard } from './guards/public-auth.guard';

const routes: Routes = window.location.hostname.split('.').length > 1 ?
  [
    {
      path: '',
      title: 'Subdomain',
      loadChildren: () => import('./subdomain/subdomain.module').then(m => m.SubdomainModule)
    }
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
