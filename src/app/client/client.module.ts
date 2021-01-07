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
import { CreateAdvertisementComponent } from './seller/create-advertisement/create-advertisement.component';
import { LoginDialogComponent } from './navigation-bar/login-dialog/login-dialog.component';
import {FormsModule} from '@angular/forms';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';


@NgModule({
  declarations: [ClientComponent, NavigationBarComponent, SideNavigationMenuComponent, SellerProfileComponent, CreateAdvertisementComponent, LoginDialogComponent, InfoDialogComponent],
    imports: [
        CommonModule,
        ClientRoutingModule,
        FormsModule
    ]
})
export class ClientModule {
}
