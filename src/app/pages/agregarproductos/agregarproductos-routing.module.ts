import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarproductosPage } from './agregarproductos.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarproductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarproductosPageRoutingModule {}
