import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdomainComponent } from './subdomain.component';
import { SubLoginComponent } from './sub-login/sub-login.component';
import { SubdomainRoutingModule } from './subdomain-routing.module';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    SubdomainComponent,
    SubLoginComponent  
  ],
  imports: [
    CommonModule,
    SubdomainRoutingModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
  ]
})
export class SubdomainModule { }
