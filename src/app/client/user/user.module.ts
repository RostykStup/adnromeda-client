import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CartComponent } from './cart/cart.component';
import {FormsModule} from '@angular/forms';
import { OrderMakingComponent } from './order-making/order-making.component';


@NgModule({
  declarations: [UserComponent, CartComponent, OrderMakingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
