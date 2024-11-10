import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregardireccionPage } from './agregardireccion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregardireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregardireccionPageRoutingModule {}
