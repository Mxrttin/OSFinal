import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarproductosPageRoutingModule } from './agregarproductos-routing.module';

import { AgregarproductosPage } from './agregarproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarproductosPageRoutingModule
  ],
  declarations: [AgregarproductosPage]
})
export class AgregarproductosPageModule {}
