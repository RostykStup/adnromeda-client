import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {CartComponent} from './cart/cart.component';
import {OrderMakingComponent} from './order-making/order-making.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {OrderFeedbackComponent} from './order-feedback/order-feedback.component';
import {AddressesManageComponent} from './addresses-manage/addresses-manage.component';
import {NotificationPageComponent} from './notification-page/notification-page.component';
import {FavoriteAdvertisementsComponent} from './favorite-advertisements/favorite-advertisements.component';
import {ViewHistoryComponent} from './view-history/view-history.component';

import {UserProfileComponent} from './user-profile/user-profile.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonDeclarationsModule} from '../declarations/common-declarations.module';
import {MainPageComponent} from './main-page/main-page.component';
import {SearchComponent} from './search/search.component';
import {AdvertisementViewComponent} from './advertisement-view/advertisement-view.component';
import { UserOrderListViewComponent } from './user-orders/user-order-list-view/user-order-list-view.component';
import { UserOrderListViewTitleComponent } from './user-orders/user-order-list-view-title/user-order-list-view-title.component';
import { UserOrderManageComponent } from './user-order-manage/user-order-manage.component';
import { UserOrderMainComponent } from './user-order-manage/user-order-main/user-order-main.component';
import { UserDeliveryManageComponent } from './user-order-manage/user-order-main/user-delivery-manage/user-delivery-manage.component';
import { UserPaymentManageComponent } from './user-order-manage/user-order-main/user-payment-manage/user-payment-manage.component';
import { UserOrderChatComponent } from './user-order-manage/order-chat/user-order-chat.component';
import { AdvertisementMainDataComponent } from './advertisement-view/advertisement-main-data/advertisement-main-data.component';

@NgModule({
  declarations: [UserComponent, CartComponent, OrderMakingComponent,
    UserOrdersComponent, OrderFeedbackComponent,
    AddressesManageComponent,
    NotificationPageComponent,
    FavoriteAdvertisementsComponent,
    ViewHistoryComponent,
    UserProfileComponent,
    SettingsPageComponent,
    MainPageComponent,
    SearchComponent,
    AdvertisementViewComponent,
    UserOrderListViewComponent,
    UserOrderListViewTitleComponent,
    UserOrderManageComponent,
    UserOrderMainComponent,
    UserDeliveryManageComponent,
    UserPaymentManageComponent,
    UserOrderChatComponent,
    AdvertisementMainDataComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonDeclarationsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
