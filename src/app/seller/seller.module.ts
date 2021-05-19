import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SellerRoutingModule} from './seller-routing.module';
import {SellerComponent} from './seller.component';
import {SellerOrdersComponent} from './seller-orders/seller-orders.component';
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
import { GoodsPropertiesCreationComponent } from './create-goods/goods-main-info/goods-properties-creаtion/goods-properties-creation.component';
import { GoodsPropertiesElementComponent } from './create-goods/goods-main-info/goods-properties-element/goods-properties-element.component';
import { GoodsParamsPriceInfoComponent } from './create-goods/goods-params-price-info/goods-params-price-info.component';
import { GoodsParametersCreationComponent } from './create-goods/goods-params-price-info/goods-parameters-creation/goods-parameters-creation.component';
import { GoodsParametersElementComponent } from './create-goods/goods-params-price-info/goods-parameters-element/goods-parameters-element.component';
import { GoodsParamValuesPriceCountListComponent } from './create-goods/goods-params-price-info/goods-param-values-price-count-list/goods-param-values-price-count-list.component';
import { GoodsParamValuesPriceCountElementComponent } from './create-goods/goods-params-price-info/goods-param-values-price-count-element/goods-param-values-price-count-element.component';
import { GoodsDeliveryInfoComponent } from './create-goods/goods-delivery-info/goods-delivery-info.component';
import { DeliveryForCreationCheckComponent } from './create-goods/goods-delivery-info/delivery-for-creation-check/delivery-for-creation-check.component';
import { GoodsImagesCreationComponent } from './create-goods/goods-images-creation/goods-images-creation.component';
import { GoodsCurrenciesChooseComponent } from './create-goods/goods-params-price-info/goods-currencies-choose/goods-currencies-choose.component';
import { GoodsCurrencyPriceInputComponent } from './create-goods/goods-params-price-info/goods-currency-price-input/goods-currency-price-input.component';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { OrderMainComponent } from './order-manage/order-main/order-main.component';
import { OrderConfirmationComponent } from './order-manage/order-confirmation/order-confirmation.component';
import { SumEnterRowComponent } from './order-manage/order-confirmation/sum-enter-row/sum-enter-row.component';
import { PaymentManageComponent } from './order-manage/order-main/payment-manage/payment-manage.component';
import { DeliveryManageComponent } from './order-manage/order-main/delivery-manage/delivery-manage.component';
import { OrderCharComponent } from './order-manage/order-char/order-char.component';

@NgModule({
  declarations: [
    SellerComponent,
    SellerOrdersComponent,
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
    GoodsMainInfoComponent,
    GoodsPropertiesCreationComponent,
    GoodsPropertiesElementComponent,
    GoodsParamsPriceInfoComponent,
    GoodsParametersCreationComponent,
    GoodsParametersElementComponent,
    GoodsParamValuesPriceCountListComponent,
    GoodsParamValuesPriceCountElementComponent,
    GoodsDeliveryInfoComponent,
    DeliveryForCreationCheckComponent,
    GoodsImagesCreationComponent,
    GoodsCurrenciesChooseComponent,
    GoodsCurrencyPriceInputComponent,
    OrderManageComponent,
    OrderMainComponent,
    OrderConfirmationComponent,
    SumEnterRowComponent,
    PaymentManageComponent,
    DeliveryManageComponent,
    OrderCharComponent
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
