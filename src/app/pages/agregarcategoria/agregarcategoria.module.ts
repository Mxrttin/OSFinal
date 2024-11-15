import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarcategoriaPageRoutingModule } from './agregarcategoria-routing.module';

import { AgregarcategoriaPage } from './agregarcategoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarcategoriaPageRoutingModule
  ],
  declarations: [AgregarcategoriaPage]
})
export class AgregarcategoriaPageModule {}
