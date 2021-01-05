import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from './client.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {
        path: 'seller-profile', loadChildren: () => {
          return import('./seller-profile/seller-profile.module').then(m => m.SellerProfileModule);
        }
      },
      {
        path: 'seller', loadChildren: () => {
          return import('./seller/seller.module').then(m => m.SellerModule);
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
