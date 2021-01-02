import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'client', pathMatch: 'full'
  },
  {
    path: 'seller-registration',
    loadChildren: () => {
      return import('./seller-registration/seller-registration.module').then(m => m.SellerRegistrationModule);
    }
  },
  {
    path: 'client',
    loadChildren: () => {
      return import('./client/client.module').then(m => m.ClientModule);
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

