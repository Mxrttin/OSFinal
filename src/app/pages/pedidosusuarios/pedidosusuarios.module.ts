import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosusuariosPageRoutingModule } from './pedidosusuarios-routing.module';

import { PedidosusuariosPage } from './pedidosusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosusuariosPageRoutingModule
  ],
  declarations: [PedidosusuariosPage]
})
export class PedidosusuariosPageModule {}
