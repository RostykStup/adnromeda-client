import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SellerComponent} from '../seller/seller.component';
import {CreateAdvertisementComponent} from '../seller/create-advertisement/create-advertisement.component';
import {UserComponent} from './user.component';
import {CartComponent} from './cart/cart.component';
import {OrderMakingComponent} from './order-making/order-making.component';

const routes: Routes = [{
  path: '', component: UserComponent, children: [
    {
      path: 'cart', component: CartComponent
    },
    {
      path: 'order', component: OrderMakingComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
