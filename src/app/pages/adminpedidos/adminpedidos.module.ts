import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminpedidosPageRoutingModule } from './adminpedidos-routing.module';

import { AdminpedidosPage } from './adminpedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminpedidosPageRoutingModule
  ],
  declarations: [AdminpedidosPage]
})
export class AdminpedidosPageModule {}
