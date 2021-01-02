import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerProfileRoutingModule } from './seller-profile-routing.module';
import { SellerInfoComponent } from './seller-info/seller-info.component';
import { SellerStatisticsComponent } from './seller-statistics/seller-statistics.component';
import { SellerSettingsComponent } from './seller-settings/seller-settings.component';


@NgModule({
  declarations: [SellerInfoComponent, SellerStatisticsComponent, SellerSettingsComponent],
  imports: [
    CommonModule,
    SellerProfileRoutingModule
  ]
})
export class SellerProfileModule { }
