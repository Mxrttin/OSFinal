import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminproductosPageRoutingModule } from './adminproductos-routing.module';

import { AdminproductosPage } from './adminproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminproductosPageRoutingModule
  ],
  declarations: [AdminproductosPage]
})
export class AdminproductosPageModule {}
