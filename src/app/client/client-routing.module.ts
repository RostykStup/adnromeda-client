import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from './client.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {
        path: 'seller-profile', loadChildren: () => {
          return import('./seller-profile/seller-profile.module').then(m => m.SellerProfileModule);
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
