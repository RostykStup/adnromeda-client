import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {CartComponent} from './cart/cart.component';
import {OrderMakingComponent} from './order-making/order-making.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {UserOrderDataComponent} from './user-order-data/user-order-data.component';
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
import { ChooseOrderAddressComponent } from './order-making/choose-order-address/choose-order-address.component';
import { ChooseOrderDeliveryComponent } from './order-making/choose-order-delivery/choose-order-delivery.component';
import { ChooseOrderPaymentComponent } from './order-making/choose-order-payment/choose-order-payment.component';
import { ChooseOrderItemsListComponent } from './order-making/choose-order-items-list/choose-order-items-list.component';
import { ChooseOrderItemViewComponent } from './order-making/choose-order-item-view/choose-order-item-view.component';


@NgModule({
  declarations: [UserComponent, CartComponent, OrderMakingComponent,
    UserOrdersComponent, UserOrderDataComponent, OrderFeedbackComponent,
    AddressesManageComponent,
    NotificationPageComponent,
    FavoriteAdvertisementsComponent,
    ViewHistoryComponent,
    UserProfileComponent,
    SettingsPageComponent,
    MainPageComponent,
    SearchComponent,
    AdvertisementViewComponent,
    ChooseOrderAddressComponent,
    ChooseOrderDeliveryComponent,
    ChooseOrderPaymentComponent,
    ChooseOrderItemsListComponent,
    ChooseOrderItemViewComponent
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
