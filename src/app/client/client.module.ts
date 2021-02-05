import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {SideNavigationMenuComponent} from './side-navigation-menu/side-navigation-menu.component';
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
import { AdvertisementViewComponent } from './search/advertisement-view/advertisement-view.component';
import { ItemAddedToCartDialogComponent } from './dialogs/item-added-to-cart-dialog/item-added-to-cart-dialog.component';
import { RatingViewComponent } from './common/rating-view/rating-view.component';
import { YearMonthPickerComponent } from './common/year-month-picker/year-month-picker.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ImageDialogComponent } from './dialogs/image-dialog/image-dialog.component';

@NgModule({
  declarations: [ClientComponent, NavigationBarComponent, SideNavigationMenuComponent, CreateAdvertisementComponent, LoginDialogComponent, InfoDialogComponent, SearchComponent, ConfirmDialogComponent, ChooseAddressDialogComponent, CreateAddressDialogComponent, CountryPickerComponent, ChooseDeliveryDialogComponent, RatingPickerComponent, PaginatorComponent, AdvertisementViewComponent, ItemAddedToCartDialogComponent, RatingViewComponent, YearMonthPickerComponent, MainPageComponent, ImageDialogComponent],
    exports: [
        RatingPickerComponent,
        PaginatorComponent,
        RatingViewComponent,
        YearMonthPickerComponent
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
