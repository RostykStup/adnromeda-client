import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SellerComponent} from './seller.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {SellerStatisticsComponent} from './seller-statistics/seller-statistics.component';
import {SellerOrdersComponent} from './seller-orders/seller-orders.component';
import {SellerFeedbacksComponent} from './seller-feedbacks/seller-feedbacks.component';
import {SellerPartnersComponent} from './seller-partners/seller-partners.component';
import {SellerNotificationsComponent} from './seller-notifications/seller-notifications.component';
import {SellerProfileModelComponent} from './seller-profile/seller-profile-model/seller-profile-model.component';
import {SellerProfileDetailsComponent} from './seller-profile/seller-profile-details/seller-profile-details.component';
import {SellerProfileDesignComponent} from './seller-profile/seller-profile-design/seller-profile-design.component';
import {CreateGoodsComponent} from './create-goods/create-goods.component';
import {OrderManageComponent} from './order-manage/order-manage.component';
import {OrderMainComponent} from './order-manage/order-main/order-main.component';
import {OrderConfirmationComponent} from './order-manage/order-confirmation/order-confirmation.component';
import {OrderCharComponent} from './order-manage/order-char/order-char.component';

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
        path: 'order-manage', component: OrderManageComponent, children: [
          {
            path: '', redirectTo: 'main'
          },
          {
            path: 'confirmation', component: OrderConfirmationComponent
          },
          {
            path: 'main', component: OrderMainComponent
          },
          {
            path: 'chat', component: OrderCharComponent
          }
        ]
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
