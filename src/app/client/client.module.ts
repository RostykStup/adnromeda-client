import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {SideNavigationMenuComponent} from './side-navigation-menu/side-navigation-menu.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';
import {SellerInfoComponent} from './seller-profile/seller-info/seller-info.component';
import {SellerSettingsComponent} from './seller-profile/seller-settings/seller-settings.component';
import {SellerStatisticsComponent} from './seller-profile/seller-statistics/seller-statistics.component';


@NgModule({
  declarations: [ClientComponent, NavigationBarComponent, SideNavigationMenuComponent, SellerProfileComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule {
}
