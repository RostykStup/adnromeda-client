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
import { AdvertisementForSearchRowViewComponent } from './common/advertisement/advertisement-for-search-row-view/advertisement-for-search-row-view.component';
import { AdvertisementForSearchTableViewComponent } from './common/advertisement/advertisement-for-search-table-view/advertisement-for-search-table-view.component';
import { OrderListViewComponent } from './common/order/order-list-view/order-list-view.component';
import { OrderItemListViewComponent } from './common/order/order-item-list-view/order-item-list-view.component';

@NgModule({
  declarations: [ClientComponent, NavigationBarComponent, SideNavigationMenuComponent, CreateAdvertisementComponent, LoginDialogComponent, InfoDialogComponent, SearchComponent, ConfirmDialogComponent, ChooseAddressDialogComponent, CreateAddressDialogComponent, CountryPickerComponent, ChooseDeliveryDialogComponent, RatingPickerComponent, PaginatorComponent, AdvertisementViewComponent, ItemAddedToCartDialogComponent, RatingViewComponent, YearMonthPickerComponent, MainPageComponent, ImageDialogComponent, AdvertisementForSearchRowViewComponent, AdvertisementForSearchTableViewComponent, OrderListViewComponent, OrderItemListViewComponent],
    exports: [
        RatingPickerComponent,
        PaginatorComponent,
        RatingViewComponent,
        YearMonthPickerComponent,
        AdvertisementForSearchRowViewComponent,
        OrderListViewComponent
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
