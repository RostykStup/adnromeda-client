import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SellerComponent} from './seller.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {SellerStatisticsComponent} from './seller-statistics/seller-statistics.component';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';
import {SellerOrdersComponent} from './seller-orders/seller-orders.component';
import {SellerFeedbacksComponent} from './seller-feedbacks/seller-feedbacks.component';
import {SellerPartnersComponent} from './seller-partners/seller-partners.component';
import {SellerNotificationsComponent} from './seller-notifications/seller-notifications.component';
import {SellerProfileModelComponent} from './seller-profile/seller-profile-model/seller-profile-model.component';
import {SellerProfileDetailsComponent} from './seller-profile/seller-profile-details/seller-profile-details.component';
import {SellerProfileDesignComponent} from './seller-profile/seller-profile-design/seller-profile-design.component';
import {CreateGoodsComponent} from './create-goods/create-goods.component';

const routes: Routes = [
  {
    path: '', component: SellerComponent, children: [
      {
        path: '', redirectTo: 'profile'
      },
      {
        path: 'profile', component: SellerProfileComponent, children: [
          {
            path: '', redirectTo: 'design'
          },
          {
            path: 'section', component: SellerProfileModelComponent
          },
          {
            path: 'design', component: SellerProfileDesignComponent
          },
          {
            path: 'details', component: SellerProfileDetailsComponent
          },
        ]
      },
      {
        path: 'goods', component: GoodsListComponent
      },
      {
        path: 'statistics', component: SellerStatisticsComponent
      },
      {
        path: 'create-goods', component: CreateGoodsComponent
      },
      {
        path: 'notifications', component: SellerNotificationsComponent
      },
      {
        path: 'orders', component: SellerOrdersComponent
      },
      {
        path: 'feedbacks', component: SellerFeedbacksComponent
      },
      {
        path: 'partners', component: SellerPartnersComponent
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
