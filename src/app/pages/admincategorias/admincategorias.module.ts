import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmincategoriasPageRoutingModule } from './admincategorias-routing.module';

import { AdmincategoriasPage } from './admincategorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmincategoriasPageRoutingModule
  ],
  declarations: [AdmincategoriasPage]
})
export class AdmincategoriasPageModule {}
