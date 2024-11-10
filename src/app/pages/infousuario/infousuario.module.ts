import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfousuarioPageRoutingModule } from './infousuario-routing.module';

import { InfousuarioPage } from './infousuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfousuarioPageRoutingModule
  ],
  declarations: [InfousuarioPage]
})
export class InfousuarioPageModule {}
