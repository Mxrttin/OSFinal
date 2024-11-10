import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarpasswordPage } from './cambiarpassword.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarpasswordPageRoutingModule {}
