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
import { YearMonthPickerComponent } from './common/date-pickers/year-month-picker/year-month-picker.component';
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
import { YearAdvertisementOrdersStatisticDiagramComponent } from './common/statistics/orders/year-advertisement-orders-statistic-diagram/year-advertisement-orders-statistic-diagram.component';
import { StatisticsColumnComponent } from './common/statistics/statistics-column/statistics-column.component';
import { StatisticsColumnDiagramComponent } from './common/statistics/statistics-column-diagram/statistics-column-diagram.component';
import { YearPickerComponent } from './common/date-pickers/year-picker/year-picker.component';
import { YearAdvertisementViewsStatisticsDiagramComponent} from './common/statistics/views/year-advertisement-views-statistics-diagram/year-advertisement-views-statistics-diagram.component';
import { RatingFeedbacksDiagramComponent } from './common/statistics/rating/rating-feedbacks-diagram/rating-feedbacks-diagram.component';
import { StatisticsRatingHorizontalColumnComponent } from './common/statistics/rating/statistics-rating-horizontal-column/statistics-rating-horizontal-column.component';
import { StatisticsRatingColumnDiagramComponent } from './common/statistics/rating/statistics-rating-horizontal-column-diagram/statistics-rating-column-diagram.component';

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [ClientComponent, NavigationBarComponent, SideNavigationMenuComponent, CreateAdvertisementComponent, LoginDialogComponent, InfoDialogComponent, SearchComponent, ConfirmDialogComponent, ChooseAddressDialogComponent, CreateAddressDialogComponent, CountryPickerComponent, ChooseDeliveryDialogComponent, RatingPickerComponent, PaginatorComponent, AdvertisementViewComponent, ItemAddedToCartDialogComponent, RatingViewComponent, YearMonthPickerComponent, MainPageComponent, ImageDialogComponent, AdvertisementForSearchRowViewComponent, AdvertisementForSearchTableViewComponent, OrderListViewComponent, OrderItemListViewComponent, ParameterValuesPriceCountPickerComponent, CreateDiscountDialogComponent, DiscountRowViewComponent, DiscountsViewComponent, GoodsSellerCategoryColumnViewComponent, CreateGoodsSellerCategoryDialogComponent, GoodsSellerCategoryPickerComponent, YearAdvertisementOrdersStatisticDiagramComponent, StatisticsColumnComponent, StatisticsColumnDiagramComponent, YearPickerComponent, YearAdvertisementViewsStatisticsDiagramComponent, RatingFeedbacksDiagramComponent, StatisticsRatingHorizontalColumnComponent, StatisticsRatingColumnDiagramComponent],
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
    YearAdvertisementOrdersStatisticDiagramComponent,
    YearAdvertisementViewsStatisticsDiagramComponent,
    RatingFeedbacksDiagramComponent
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
