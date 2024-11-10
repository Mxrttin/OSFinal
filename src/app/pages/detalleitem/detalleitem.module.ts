import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleitemPageRoutingModule } from './detalleitem-routing.module';

import { DetalleitemPage } from './detalleitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleitemPageRoutingModule
  ],
  declarations: [DetalleitemPage]
})
export class DetalleitemPageModule {}
