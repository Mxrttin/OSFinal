import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminproductosPage } from './adminproductos.page';

const routes: Routes = [
  {
    path: '',
    component: AdminproductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminproductosPageRoutingModule {}
