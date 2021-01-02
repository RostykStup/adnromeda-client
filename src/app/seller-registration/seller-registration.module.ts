import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRegistrationRoutingModule } from './seller-registration-routing.module';
import { SellerRegistrationComponent } from './seller-registration.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [SellerRegistrationComponent],
  imports: [
    CommonModule,
    SellerRegistrationRoutingModule,
    FormsModule
  ]
})
export class SellerRegistrationModule { }
