import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
    pathMatch: 'full'
  },
  {
    path: 'public',
    component: PublicComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'public'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// {
  //   path: '',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     }, {
  //       path: 'dashboard',
  //       loadChildren: () => import('./pages/dashboard//dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
  //     }, {
  //       path: 'basic',
  //       loadChildren: () => import('./pages/ui-elements/basic/basic.module').then(m => m.BasicModule)
  //     }, {
  //       path: 'notifications',
  //       loadChildren: () => import('./pages/ui-elements/advance/notifications/notifications.module').then(m => m.NotificationsModule)
  //     }, {
  //       path: 'bootstrap-table',
  //       loadChildren: () => import('./pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
  //     }, {
  //       path: 'map',
  //       loadChildren: () => import('./pages/map/google-map/google-map.module').then(m => m.GoogleMapModule),
  //     }, {
  //       path: 'user',
  //       loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
  //     }, {
  //       path: 'simple-page',
  //       loadChildren: () => import('./pages/simple-page/simple-page.module').then(m => m.SimplePageModule)
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   component: AuthComponent,
  //   children: [
  //     {
  //       path: 'auth',
  //       loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  //     }
  //   ]
  // }