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


@NgModule({
  declarations: [UserComponent, CartComponent, OrderMakingComponent,
    UserOrdersComponent, UserOrderDataComponent, OrderFeedbackComponent,
    AddressesManageComponent,
    NotificationPageComponent,
    FavoriteAdvertisementsComponent,
    ViewHistoryComponent,
    UserProfileComponent,
    SettingsPageComponent,
    MainPageComponent
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
