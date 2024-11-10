import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleitemPage } from './detalleitem.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleitemPageRoutingModule {}
