import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmincategoriasPage } from './admincategorias.page';

const routes: Routes = [
  {
    path: '',
    component: AdmincategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmincategoriasPageRoutingModule {}
