import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './features/home/home.component';
import { HeroSectionComponent } from './features/home/hero-section/hero-section.component';
import { InfoComponent } from './features/home/info/info.component';
import { ContactUsComponent } from './features/home/contact-us/contact-us.component';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroSectionComponent,
    InfoComponent,
    ContactUsComponent,
  ],
  exports: [PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    AuthModule,
  ]
})
export class PublicModule { }
