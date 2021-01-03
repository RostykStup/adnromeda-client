import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from './client.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {
        path: 'seller-profile', loadChildren: () => {
          return import('./seller-profile/seller-profile.module').then(m => m.SellerProfileModule);
        }
      },
      {
        path: 'create-goods-advertisement', component: CreateAdvertisementComponent
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
