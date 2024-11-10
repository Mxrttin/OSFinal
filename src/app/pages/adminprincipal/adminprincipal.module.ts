import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminprincipalPageRoutingModule } from './adminprincipal-routing.module';

import { AdminprincipalPage } from './adminprincipal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminprincipalPageRoutingModule
  ],
  declarations: [AdminprincipalPage]
})
export class AdminprincipalPageModule {}
