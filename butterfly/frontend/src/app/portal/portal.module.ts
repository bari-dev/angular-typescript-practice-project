import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';

@NgModule({
  declarations: [
    PortalComponent
  ],
  exports: [PortalComponent],
  imports: [
    CommonModule,
    PortalRoutingModule
  ]
})
export class PublicModule { }
