import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarPageRoutingModule } from './recuperar-routing.module';
import { RecuperarPage } from './recuperar.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RecuperarPageRoutingModule
  ],
  declarations: [RecuperarPage]
})
export class RecuperarPageModule {}
