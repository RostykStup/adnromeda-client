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
import { ParameterValuesPriceCountPickerComponent } from './common/advertisement/parameter/parameter-values-price-count-picker/parameter-values-price-count-picker.component';
import { CreateDiscountDialogComponent } from './dialogs/create-discount-dialog/create-discount-dialog.component';
import { DiscountRowViewComponent } from './common/advertisement/discount/discount-row-view/discount-row-view.component';
import { DiscountsViewComponent } from './common/advertisement/discount/discounts-view/discounts-view.component';
import { GoodsSellerCategoryColumnViewComponent } from './common/seller/goods-seller/category/goods-seller-category-column-view/goods-seller-category-column-view.component';
import { CreateGoodsSellerCategoryDialogComponent } from './dialogs/create-goods-seller-category-dialog/create-goods-seller-category-dialog.component';
import { GoodsSellerCategoryPickerComponent } from './common/seller/goods-seller/category/goods-seller-category-picker/goods-seller-category-picker.component';
import { GoodsShopMarkupComponent } from './common/seller/goods-seller/markup/goods-shop-markup/goods-shop-markup.component';
import { GoodsShopMarkupLineComponent } from './common/seller/goods-seller/markup/goods-shop-markup-line/goods-shop-markup-line.component';
import { GoodsShopMarkupElementComponent } from './common/seller/goods-seller/markup/goods-shop-markup-element/goods-shop-markup-element.component';
import { GoodsShopMarkupAdvertisingBannerComponent } from './common/seller/goods-seller/markup/elements/goods-shop-markup-advertising-banner/goods-shop-markup-advertising-banner.component';
import { GoodsShopMarkupAdvertisementRowComponent } from './common/seller/goods-seller/markup/elements/goods-shop-markup-advertisement-row/goods-shop-markup-advertisement-row.component';
import { GoodsShopMarkupAdvertisementViewComponent } from './common/seller/goods-seller/markup/elements/goods-shop-markup-advertisement-view/goods-shop-markup-advertisement-view.component';
import { ChooseLineTypeDialogComponent } from './common/seller/goods-seller/markup/dialogs/choose-line-type-dialog/choose-line-type-dialog.component';
import { ChooseElementDialogComponent } from './common/seller/goods-seller/markup/dialogs/choose-element-dialog/choose-element-dialog.component';
import { CreateBannerDialogComponent } from './common/seller/goods-seller/markup/dialogs/create-banner-dialog/create-banner-dialog.component';
import { CreateAdvertisementViewDialogComponent } from './common/seller/goods-seller/markup/dialogs/create-advertisement-view-dialog/create-advertisement-view-dialog.component';
import { ChooseAdvertisementDialogComponent } from './dialogs/choose-advertisement-dialog/choose-advertisement-dialog.component';
import { CreateAdvertisementsRowDialogComponent } from './common/seller/goods-seller/markup/dialogs/create-advertisements-row-dialog/create-advertisements-row-dialog.component';

@NgModule({
  declarations: [ClientComponent, NavigationBarComponent, SideNavigationMenuComponent, CreateAdvertisementComponent, LoginDialogComponent, InfoDialogComponent, SearchComponent, ConfirmDialogComponent, ChooseAddressDialogComponent, CreateAddressDialogComponent, CountryPickerComponent, ChooseDeliveryDialogComponent, RatingPickerComponent, PaginatorComponent, AdvertisementViewComponent, ItemAddedToCartDialogComponent, RatingViewComponent, YearMonthPickerComponent, MainPageComponent, ImageDialogComponent, AdvertisementForSearchRowViewComponent, AdvertisementForSearchTableViewComponent, OrderListViewComponent, OrderItemListViewComponent, ParameterValuesPriceCountPickerComponent, CreateDiscountDialogComponent, DiscountRowViewComponent, DiscountsViewComponent, GoodsSellerCategoryColumnViewComponent, CreateGoodsSellerCategoryDialogComponent, GoodsSellerCategoryPickerComponent, GoodsShopMarkupComponent, GoodsShopMarkupLineComponent, GoodsShopMarkupElementComponent, GoodsShopMarkupAdvertisingBannerComponent, GoodsShopMarkupAdvertisementRowComponent, GoodsShopMarkupAdvertisementViewComponent, ChooseLineTypeDialogComponent, ChooseElementDialogComponent, CreateBannerDialogComponent, CreateAdvertisementViewDialogComponent, ChooseAdvertisementDialogComponent, CreateAdvertisementsRowDialogComponent],
    exports: [
        RatingPickerComponent,
        PaginatorComponent,
        RatingViewComponent,
        YearMonthPickerComponent,
        AdvertisementForSearchRowViewComponent,
        OrderListViewComponent,
        ParameterValuesPriceCountPickerComponent,
        DiscountsViewComponent,
        GoodsSellerCategoryColumnViewComponent,
        GoodsSellerCategoryPickerComponent,
        GoodsShopMarkupComponent
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
