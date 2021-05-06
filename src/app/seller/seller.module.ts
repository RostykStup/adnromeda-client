import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SellerRoutingModule} from './seller-routing.module';
import {SellerComponent} from './seller.component';
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
import {SellerCategorySettingsComponent} from './seller-settings/seller-category-settings/seller-category-settings.component';
// tslint:disable-next-line:max-line-length
import {SellerNotificationsSettingsComponent} from './seller-settings/seller-notifications-settings/seller-notifications-settings.component';

import {BrowserModule} from '@angular/platform-browser';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';
import {CommonDeclarationsModule} from '../declarations/common-declarations.module';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {SellerFeedbacksComponent} from './seller-feedbacks/seller-feedbacks.component';
import {SellerPartnersComponent} from './seller-partners/seller-partners.component';
import { SellerProfileModelComponent } from './seller-profile/seller-profile-model/seller-profile-model.component';
import { SellerProfileDesignComponent } from './seller-profile/seller-profile-design/seller-profile-design.component';
import { SellerProfileDetailsComponent } from './seller-profile/seller-profile-details/seller-profile-details.component';
import { SellerOrderListViewComponent } from './seller-orders/seller-order-list-view/seller-order-list-view.component';
import { SellerOrderListViewTitleComponent } from './seller-orders/seller-order-list-view-title/seller-order-list-view-title.component';
import { SellerGoodsListViewTitleComponent } from './goods-list/seller-goods-list-view-title/seller-goods-list-view-title.component';
import { SellerGoodsListViewComponent } from './goods-list/seller-goods-list-view/seller-goods-list-view.component';
import { CreateGoodsComponent } from './create-goods/create-goods.component';
import { GoodsMainInfoComponent } from './create-goods/goods-main-info/goods-main-info.component';


@NgModule({
  declarations: [
    SellerComponent,
    SellerOrdersComponent,
    OrderDataComponent,
    AdvertisementsListComponent,
    AdvertisementManageComponent,
    AdvertisementUpdatingComponent,
    AdvertisementStatisticsComponent,
    SellerProfileComponent,
    SellerNotificationsComponent,
    SellerSettingsComponent,
    SellerStatisticsComponent,
    AdvertisementDiscountsComponent,
    SellerMainSettingsComponent,
    SellerCategorySettingsComponent,
    SellerNotificationsSettingsComponent,
    CreateAdvertisementComponent,
    GoodsListComponent,
    SellerFeedbacksComponent,
    SellerPartnersComponent,
    SellerProfileModelComponent,
    SellerProfileDesignComponent,
    SellerProfileDetailsComponent,
    SellerOrderListViewComponent,
    SellerOrderListViewTitleComponent,
    SellerGoodsListViewTitleComponent,
    SellerGoodsListViewComponent,
    CreateGoodsComponent,
    GoodsMainInfoComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    CommonDeclarationsModule,
    FormsModule
  ]
})
export class SellerModule {
}
