import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SellerComponent} from './seller.component';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';

const routes: Routes = [
  {
    path: '', component: SellerComponent, children: [
      {
        path: 'create-advertisement', component: CreateAdvertisementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
