import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from './client.component';
import {SearchComponent} from './search/search.component';

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
      },
      {
        path: 'search', component: SearchComponent
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
