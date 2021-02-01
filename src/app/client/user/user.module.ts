

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {CartComponent} from './cart/cart.component';
import {FormsModule} from '@angular/forms';
import {OrderMakingComponent} from './order-making/order-making.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {UserOrderDataComponent} from './user-order-data/user-order-data.component';
import {ClientModule} from '../client.module';
import {OrderFeedbackComponent} from './order-feedback/order-feedback.component';
import {AddressesManageComponent} from './addresses-manage/addresses-manage.component';
import {NotificationPageComponent} from './notification-page/notification-page.component';
import {FavoriteAdvertisementsComponent} from './favorite-advertisements/favorite-advertisements.component';
import {ViewHistoryComponent} from './view-history/view-history.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [UserComponent, CartComponent, OrderMakingComponent,
    UserOrdersComponent, UserOrderDataComponent, OrderFeedbackComponent,
    AddressesManageComponent, NotificationPageComponent, FavoriteAdvertisementsComponent, ViewHistoryComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ClientModule,
    // BrowserModule
  ]
})
export class UserModule {
}
