import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {SideNavigationMenuComponent} from './side-navigation-menu/side-navigation-menu.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';
import {CreateAdvertisementComponent} from './seller/create-advertisement/create-advertisement.component';
import {LoginDialogComponent} from './navigation-bar/login-dialog/login-dialog.component';
import {FormsModule} from '@angular/forms';
import {InfoDialogComponent} from './dialogs/info-dialog/info-dialog.component';
import {SearchComponent} from './search/search.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog.component';
import {ChooseAddressDialogComponent} from './dialogs/choose-address-dialog/choose-address-dialog.component';
import {CreateAddressDialogComponent} from './dialogs/create-address-dialog/create-address-dialog.component';
import {CountryPickerComponent} from './common/country-picker/country-picker.component';
import {ChooseDeliveryDialogComponent} from './dialogs/choose-delivery-dialog/choose-delivery-dialog.component';
import {RatingPickerComponent} from './common/rating-picker/rating-picker.component';
import { PaginatorComponent } from './common/paginator/paginator.component';

@NgModule({
  declarations: [ClientComponent, NavigationBarComponent, SideNavigationMenuComponent, SellerProfileComponent, CreateAdvertisementComponent, LoginDialogComponent, InfoDialogComponent, SearchComponent, ConfirmDialogComponent, ChooseAddressDialogComponent, CreateAddressDialogComponent, CountryPickerComponent, ChooseDeliveryDialogComponent, RatingPickerComponent, PaginatorComponent],
  exports: [
    RatingPickerComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ClickOutsideModule
  ]
})
export class ClientModule {
}
