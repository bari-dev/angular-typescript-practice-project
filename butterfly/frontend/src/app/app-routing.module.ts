import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthActivateGuard } from './guards/activate/auth.guard';
import { AuthMatchGuard, UnauthMatchGuard } from './guards/match/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  //   canMatch: [UnauthMatchGuard],
  // },
  {
    path: '',
    loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule),
    // canMatch: [AuthMatchGuard],
  },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
