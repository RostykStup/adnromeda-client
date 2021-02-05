import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from './client.component';
import {SearchComponent} from './search/search.component';
import {AdvertisementViewComponent} from './search/advertisement-view/advertisement-view.component';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      {
        path: '', redirectTo: 'main'
      },
      {
        path: 'seller', loadChildren: () => {
          return import('./seller/seller.module').then(m => m.SellerModule);
        }
      },
      {
        path: 'user', loadChildren: () => {
          return import('./user/user.module').then(m => m.UserModule);
        }
      },
      {
        path: 'search', component: SearchComponent
      },
      {
        path: 'advertisement-view', component: AdvertisementViewComponent
      },
      {
        path: 'main', component: MainPageComponent
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
