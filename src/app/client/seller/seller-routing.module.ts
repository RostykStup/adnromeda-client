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
import {SellerNotificationsComponent} from './seller-notifications/seller-notifications.component';
import {SellerSettingsComponent} from './seller-settings/seller-settings.component';
import {SellerStatisticsComponent} from './seller-statistics/seller-statistics.component';
import {AdvertisementDiscountsComponent} from './advertisement-manage/advertisement-discounts/advertisement-discounts.component';
import {SellerMainSettingsComponent} from './seller-settings/seller-main-settings/seller-main-settings.component';
import {SellerNotificationsSettingsComponent} from './seller-settings/seller-notifications-settings/seller-notifications-settings.component';
import {SellerPanelSettingsComponent} from './seller-settings/seller-panel-settings/seller-panel-settings.component';
import {SellerCategorySettingsComponent} from './seller-settings/seller-category-settings/seller-category-settings.component';

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
        path: 'notifications', component: SellerNotificationsComponent
      },
      {
        path: 'settings', component: SellerSettingsComponent
        , children: [{
          path: 'main', component: SellerMainSettingsComponent
        }, {
          path: 'notifications', component: SellerNotificationsSettingsComponent
        }, {
          path: 'panel', component: SellerPanelSettingsComponent
        }, {
          path: 'category', component: SellerCategorySettingsComponent
        }, {
          path: '', redirectTo: 'main'
        }]
      },
      {
        path: 'statistics', component: SellerStatisticsComponent
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
          path: 'discounts', component: AdvertisementDiscountsComponent
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
