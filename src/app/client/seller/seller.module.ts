import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { OrderDataComponent } from './order-data/order-data.component';
import {FormsModule} from '@angular/forms';
import {ClientModule} from '../client.module';
import { AdvertisementsListComponent } from './advertisements-list/advertisements-list.component';
import { AdvertisementManageComponent } from './advertisement-manage/advertisement-manage.component';
import { AdvertisementUpdatingComponent } from './advertisement-manage/advertisement-updating/advertisement-updating.component';
import { AdvertisementStatisticsComponent } from './advertisement-manage/advertisement-statistics/advertisement-statistics.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { SellerNotificationsComponent } from './seller-notifications/seller-notifications.component';
import { SellerSettingsComponent } from './seller-settings/seller-settings.component';
import { SellerStatisticsComponent } from './seller-statistics/seller-statistics.component';
import { AdvertisementDiscountsComponent } from './advertisement-manage/advertisement-discounts/advertisement-discounts.component';
import { SellerMainSettingsComponent } from './seller-settings/seller-main-settings/seller-main-settings.component';
import { SellerCategorySettingsComponent } from './seller-settings/seller-category-settings/seller-category-settings.component';
import { SellerNotificationsSettingsComponent } from './seller-settings/seller-notifications-settings/seller-notifications-settings.component';


@NgModule({
  declarations: [SellerComponent, SellerOrdersComponent, OrderDataComponent, AdvertisementsListComponent, AdvertisementManageComponent, AdvertisementUpdatingComponent, AdvertisementStatisticsComponent, SellerProfileComponent, SellerNotificationsComponent, SellerSettingsComponent, SellerStatisticsComponent, AdvertisementDiscountsComponent, SellerMainSettingsComponent, SellerCategorySettingsComponent, SellerNotificationsSettingsComponent],
    imports: [
        CommonModule,
        SellerRoutingModule,
        FormsModule,
        ClientModule
    ]
})
export class SellerModule { }
