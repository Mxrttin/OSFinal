import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminusuariosPageRoutingModule } from './adminusuarios-routing.module';

import { AdminusuariosPage } from './adminusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminusuariosPageRoutingModule
  ],
  declarations: [AdminusuariosPage]
})
export class AdminusuariosPageModule {}
