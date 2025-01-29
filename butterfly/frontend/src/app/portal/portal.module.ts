import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// material tags
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SalaeforceComponent } from './features/salaeforce/salaeforce.component';
import { SettingsComponent } from './features/settings/settings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PortalComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SalaeforceComponent,
    SettingsComponent,
  ],
  exports: [PortalComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    FormsModule
  ]
})
export class PortalModule { }
