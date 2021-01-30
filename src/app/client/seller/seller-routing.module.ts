import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SellerComponent} from './seller.component';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';
import {SellerOrdersComponent} from './seller-orders/seller-orders.component';
import {OrderDataComponent} from './order-data/order-data.component';
import {AdvertisementsListComponent} from './advertisements-list/advertisements-list.component';
import {AdvertisementManageComponent} from './advertisement-manage/advertisement-manage.component';
import {AdvertisementUpdatingComponent} from './advertisement-manage/advertisement-updating/advertisement-updating.component';
import {AdvertisementStatisticsComponent} from './advertisement-manage/advertisement-statistics/advertisement-statistics.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';

const routes: Routes = [
  {
    path: '', component: SellerComponent, children: [
      {
        path: 'create-advertisement', component: CreateAdvertisementComponent
      },
      {
        path: 'profile', component: SellerProfileComponent
      },
      {
        path: 'orders', component: SellerOrdersComponent
      },
      {
        path: 'order-data', component: OrderDataComponent
      },
      {
        path: 'advertisements', component: AdvertisementsListComponent
      },
      {
        path: 'advertisement-manage', component: AdvertisementManageComponent, children: [{
          path: '', redirectTo: 'updating'
        }, {
          path: 'updating', component: AdvertisementUpdatingComponent
        }, {
          path: 'statistics', component: AdvertisementStatisticsComponent
        }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {
}
