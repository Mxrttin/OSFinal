import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarpasswordPageRoutingModule } from './cambiarpassword-routing.module';

import { CambiarpasswordPage } from './cambiarpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarpasswordPageRoutingModule
  ],
  declarations: [CambiarpasswordPage]
})
export class CambiarpasswordPageModule {}
