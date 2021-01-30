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


@NgModule({
  declarations: [SellerComponent, SellerOrdersComponent, OrderDataComponent, AdvertisementsListComponent, AdvertisementManageComponent, AdvertisementUpdatingComponent, AdvertisementStatisticsComponent, SellerProfileComponent],
    imports: [
        CommonModule,
        SellerRoutingModule,
        FormsModule,
        ClientModule
    ]
})
export class SellerModule { }
