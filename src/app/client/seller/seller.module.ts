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


@NgModule({
  declarations: [SellerComponent, SellerOrdersComponent, OrderDataComponent, AdvertisementsListComponent, AdvertisementManageComponent, AdvertisementUpdatingComponent, AdvertisementStatisticsComponent, SellerProfileComponent, SellerNotificationsComponent, SellerSettingsComponent, SellerStatisticsComponent],
    imports: [
        CommonModule,
        SellerRoutingModule,
        FormsModule,
        ClientModule
    ]
})
export class SellerModule { }
