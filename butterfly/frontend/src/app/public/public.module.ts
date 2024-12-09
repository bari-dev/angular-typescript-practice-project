import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ]
})
export class PublicModule { }
