import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CartSellerPositionResponse} from '../../../../entity/cart/cart-seller-position-response';
import {AndromedaCheckboxComponent} from '../../components/andromeda-checkbox/andromeda-checkbox.component';
import {CartItemComponent} from './cart-item/cart-item.component';
import {CartService} from '../../../../service/cart/cart.service';
import {Router} from '@angular/router';
import {NavigationService} from '../../../../common/navigation.service';

@Component({
    selector: 'app-seller-position',
    templateUrl: './seller-position.component.html',
    styleUrls: ['./seller-position.component.scss']
})
export class SellerPositionComponent implements OnInit {

    constructor(private cartService: CartService, private router: Router) {
    }

    // @ts-ignore
    @Input() position: CartSellerPositionResponse;

    // @ts-ignore
    @ViewChildren(CartItemComponent) itemsComponents: QueryList<CartItemComponent>;
    // @ts-ignore
    @ViewChildren(AndromedaCheckboxComponent) checkbox: QueryList<AndromedaCheckboxComponent>;

    sum: null | number = null;

    ngOnInit(): void {
    }

    changeSelectAll($event: boolean): void {
        this.itemsComponents.forEach((c) => {
            c.setCheck($event);
        });
        this.recountSum();
    }

    changeItemCheck($event: boolean): void {
        let count = 0;
        this.itemsComponents.forEach((i) => {
            if (i.isChecked()) {
                count++;
            }
        });
        if (count === 0) {
            this.checkbox.first.statement = 'uncheck';
        } else if (count === this.position.items.length) {
            this.checkbox.first.statement = 'check';
        } else {
            this.checkbox.first.statement = 'indeterminate';
        }
    }


    recountSum(): void {
        this.sum = 0;
        this.itemsComponents.forEach((i) => {
            if (i.isChecked()) {
                // @ts-ignore
                this.sum = this.sum + i.getSum();
            }
        });
        if (this.sum === 0) {
            this.sum = null;
        }
    }

    exchangeItems(currency: string): void {
        const ids = new Array<number>();
        this.position.items.forEach((i) => {
            ids.push(i.id);
        });
        this.cartService.exchangeSellerPositionCurrency(currency, ids).subscribe((r) => {
            this.position = r;
        });
    }

    changeCurrencySelect($event: any): void {
        this.checkbox.first.statement = 'uncheck';
        this.sum = null;
        const currency = $event.target.value;
        this.exchangeItems(currency);
    }

    moveToMakeOrder(): void {
        const ids = new Array<number>();
        this.itemsComponents.forEach((i) => {
            if (i.isChecked()) {
                ids.push(i.item.id);
            }
        });
        this.router.navigateByUrl(NavigationService.getUserMakingOrderUrl() + '?currency=' + this.position.currencyResponse.code + '&cartItemsId=' + ids.join(','));
    }
}
