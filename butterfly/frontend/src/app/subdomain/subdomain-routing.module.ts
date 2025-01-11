import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthActivateGuard } from '../guards/auth.guard';
import { TasksComponent } from '../subdomain/tasks/tasks.component';
import { SubdomainService } from '../core/services/subdomain.service';
import { SubLoginComponent } from './sub-login/sub-login.component';
import { SubdomainAuthService } from '../core/services/subdomain-auth.service';
import { AuthenticationResolver } from '../core/resolvers/authentication.resolver';

const routes: Routes = [
  {
    path: '',
    title: 'SubdomainLogin',
    component: SubLoginComponent,
  },
  {
    path: 'tasks',
    title: 'Tasks',
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
  },
  // {
  //   path: '**',
  //   resolve: {
  //     isAuthenticated: AuthenticationResolver
  //   },
    // redirectTo: () => {
    //   return AuthenticationResolver ? 'tasks' : 'sblogin';
    // }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdomainRoutingModule {
  constructor(private subdomainService: SubdomainService) {}
}
