import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvertisementForSearchRowViewComponent} from '../common/advertisement/advertisement-for-search-row-view/advertisement-for-search-row-view.component';
import {AdvertisementForSearchTableViewComponent} from '../common/advertisement/advertisement-for-search-table-view/advertisement-for-search-table-view.component';
import {DiscountsViewComponent} from '../common/advertisement/discount/discounts-view/discounts-view.component';
import {DiscountRowViewComponent} from '../common/advertisement/discount/discount-row-view/discount-row-view.component';
import {ParameterValuesPriceCountPickerComponent} from '../common/advertisement/parameter/parameter-values-price-count-picker/parameter-values-price-count-picker.component';
import {CountryPickerComponent} from '../common/country-picker/country-picker.component';
import {YearPickerComponent} from '../common/date-pickers/year-picker/year-picker.component';
import {YearMonthPickerComponent} from '../common/date-pickers/year-month-picker/year-month-picker.component';
import {PaginatorComponent} from '../common/paginator/paginator.component';
import {RatingPickerComponent} from '../common/rating-picker/rating-picker.component';
import {RatingViewComponent} from '../common/rating-view/rating-view.component';
import {GoodsSellerCategoryPickerComponent} from '../common/seller/goods-seller/category/goods-seller-category-picker/goods-seller-category-picker.component';
import {GoodsSellerCategoryColumnViewComponent} from '../common/seller/goods-seller/category/goods-seller-category-column-view/goods-seller-category-column-view.component';
import {YearAdvertisementOrdersStatisticDiagramComponent} from '../common/statistics/orders/year-advertisement-orders-statistic-diagram/year-advertisement-orders-statistic-diagram.component';
import {YearAdvertisementViewsStatisticsDiagramComponent} from '../common/statistics/views/year-advertisement-views-statistics-diagram/year-advertisement-views-statistics-diagram.component';
import {RatingFeedbacksDiagramComponent} from '../common/statistics/rating/rating-feedbacks-diagram/rating-feedbacks-diagram.component';
import {StatisticsRatingHorizontalColumnComponent} from '../common/statistics/rating/statistics-rating-horizontal-column/statistics-rating-horizontal-column.component';
import {StatisticsRatingColumnDiagramComponent} from '../common/statistics/rating/statistics-rating-horizontal-column-diagram/statistics-rating-column-diagram.component';
import {StatisticsColumnComponent} from '../common/statistics/statistics-column/statistics-column.component';
import {StatisticsColumnDiagramComponent} from '../common/statistics/statistics-column-diagram/statistics-column-diagram.component';
import {ChooseAddressDialogComponent} from '../dialogs/choose-address-dialog/choose-address-dialog.component';
import {ChooseAdvertisementDialogComponent} from '../dialogs/choose-advertisement-dialog/choose-advertisement-dialog.component';
import {ChooseDeliveryDialogComponent} from '../dialogs/choose-delivery-dialog/choose-delivery-dialog.component';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {CreateAddressDialogComponent} from '../dialogs/create-address-dialog/create-address-dialog.component';
import {CreateDiscountDialogComponent} from '../dialogs/create-discount-dialog/create-discount-dialog.component';
import {CreateGoodsSellerCategoryDialogComponent} from '../dialogs/create-goods-seller-category-dialog/create-goods-seller-category-dialog.component';
import {ImageDialogComponent} from '../dialogs/image-dialog/image-dialog.component';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {ItemAddedToCartDialogComponent} from '../dialogs/item-added-to-cart-dialog/item-added-to-cart-dialog.component';
import {FormsModule} from '@angular/forms';
import {LoginDialogComponent} from '../dialogs/login-dialog/login-dialog.component';
import { UserTopPanelComponent } from '../common/panels/top-panel/user-top-panel/user-top-panel.component';
import { SellerTopPanelComponent } from '../common/panels/top-panel/seller-top-panel/seller-top-panel.component';
import { AdminTopPanelComponent } from '../common/panels/top-panel/admin-top-panel/admin-top-panel.component';
import { UserLeftPanelComponent } from '../common/panels/left-panel/user-left-panel/user-left-panel.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SellerLeftPanelComponent } from '../common/panels/left-panel/seller-left-panel/seller-left-panel.component';
import { ArrowPaginatorComponent} from '../common/paginator/arrow-paginator/arrow-paginator.component';
import {MatOptionModule} from '@angular/material/core';
import {AndromedaCheckboxComponent} from '../common/components/andromeda-checkbox/andromeda-checkbox.component';
import { AddedImageContainerComponent } from '../common/images/added-image-container/added-image-container.component';
import { TopPanelSearchInputComponent } from '../common/panels/top-panel-search-input/top-panel-search-input.component';
import { SellerPositionComponent } from '../common/cart-order/seller-position/seller-position.component';
import { CartItemComponent } from '../common/cart-order/seller-position/cart-item/cart-item.component';
import { DeliveryPickerComponent } from '../common/delivery/delivery-picker/delivery-picker.component';
import { AddressViewComponent } from '../common/address/address-view/address-view.component';
import {RouterModule} from '@angular/router';
import { AccountsControlDialogComponent } from '../dialogs/accounts-control-dialog/accounts-control-dialog.component';
import {ChooseOrderDeliveryComponent} from '../common/order-making/choose-order-delivery/choose-order-delivery.component';
import {ChooseOrderAddressComponent} from '../common/order-making/choose-order-address/choose-order-address.component';
import {ChooseOrderPaymentComponent} from '../common/order-making/choose-order-payment/choose-order-payment.component';
import {ChooseOrderItemsListComponent} from '../common/order-making/choose-order-items-list/choose-order-items-list.component';
import {ChooseOrderItemViewComponent} from '../common/order-making/choose-order-item-view/choose-order-item-view.component';
import { DeliveryDetailsViewComponent } from '../common/address/delivery-details-view/delivery-details-view.component';
import {OrderItemListViewComponent} from '../common/cart-order/order/order-item-list-view/order-item-list-view.component';
import { OrderItemListTitleComponent } from '../common/cart-order/order/order-item-list-title/order-item-list-title.component';
import { OrderChangesComponent } from '../common/cart-order/order/order-changes/order-changes.component';
import { ChatComponent } from '../common/chat/chat/chat.component';
import { ChatBodyComponent } from '../common/chat/chat/chat-body/chat-body.component';
import { ChatMessageComponent } from '../common/chat/chat/chat-message/chat-message.component';
import { ChatMessageSenderComponent } from '../common/chat/chat/chat-message-sender/chat-message-sender.component';
import { ChatDayBlockComponent } from '../common/chat/chat/chat-day-block/chat-day-block.component';

@NgModule({
  declarations: [
    ChooseOrderDeliveryComponent,
    ChooseOrderAddressComponent,
    ChooseOrderPaymentComponent,
    ChooseOrderItemsListComponent,
    ChooseOrderItemViewComponent,
    AdvertisementForSearchRowViewComponent,
    AdvertisementForSearchTableViewComponent,
    DiscountsViewComponent,
    DiscountRowViewComponent,
    ParameterValuesPriceCountPickerComponent,
    CountryPickerComponent,
    YearPickerComponent,
    YearMonthPickerComponent,
    PaginatorComponent,
    RatingPickerComponent,
    RatingViewComponent,
    GoodsSellerCategoryPickerComponent,
    GoodsSellerCategoryColumnViewComponent,
    YearAdvertisementOrdersStatisticDiagramComponent,
    YearAdvertisementViewsStatisticsDiagramComponent,
    RatingFeedbacksDiagramComponent,
    StatisticsRatingHorizontalColumnComponent,
    StatisticsRatingColumnDiagramComponent,
    StatisticsColumnComponent,
    StatisticsColumnDiagramComponent,
    ChooseAddressDialogComponent,
    ChooseAdvertisementDialogComponent,
    ChooseDeliveryDialogComponent,
    ConfirmDialogComponent,
    CreateAddressDialogComponent,
    CreateDiscountDialogComponent,
    CreateGoodsSellerCategoryDialogComponent,
    ImageDialogComponent,
    InfoDialogComponent,
    ItemAddedToCartDialogComponent,
    LoginDialogComponent,
    UserTopPanelComponent,
    SellerTopPanelComponent,
    AdminTopPanelComponent,
    UserLeftPanelComponent,
    SellerLeftPanelComponent,
    ArrowPaginatorComponent,
    AndromedaCheckboxComponent,
    AddedImageContainerComponent,
    TopPanelSearchInputComponent,
    SellerPositionComponent,
    CartItemComponent,
    DeliveryPickerComponent,
    AddressViewComponent,
    AccountsControlDialogComponent,
    DeliveryDetailsViewComponent,
    OrderItemListViewComponent,
    OrderItemListTitleComponent,
    OrderChangesComponent,
    ChatComponent,
    ChatBodyComponent,
    ChatMessageComponent,
    ChatMessageSenderComponent,
    ChatDayBlockComponent
  ],
    exports: [
        GoodsSellerCategoryColumnViewComponent,
        GoodsSellerCategoryPickerComponent,
        DiscountsViewComponent,
        RatingViewComponent,
        PaginatorComponent,
        YearAdvertisementViewsStatisticsDiagramComponent,
        YearAdvertisementOrdersStatisticDiagramComponent,
        RatingFeedbacksDiagramComponent,
        AdvertisementForSearchRowViewComponent,
        RatingPickerComponent,
        UserTopPanelComponent,
        SellerTopPanelComponent,
        UserLeftPanelComponent,
        SellerLeftPanelComponent,
        ArrowPaginatorComponent,
        AndromedaCheckboxComponent,
        AddedImageContainerComponent,
        AdvertisementForSearchTableViewComponent,
        SellerPositionComponent,
        AddressViewComponent,
        ChooseOrderDeliveryComponent,
        ChooseOrderPaymentComponent,
        ChooseOrderItemsListComponent,
        ChooseOrderAddressComponent,
        DeliveryDetailsViewComponent,
        OrderItemListViewComponent,
        OrderItemListTitleComponent,
        OrderChangesComponent,
        ChatComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ClickOutsideModule,
        MatOptionModule,
        RouterModule
    ]
})
export class CommonDeclarationsModule {
}
