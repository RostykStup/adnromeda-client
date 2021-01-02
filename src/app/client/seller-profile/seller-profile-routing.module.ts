import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SellerProfileComponent} from './seller-profile.component';
import {SellerInfoComponent} from './seller-info/seller-info.component';
import {SellerSettingsComponent} from './seller-settings/seller-settings.component';
import {SellerStatisticsComponent} from './seller-statistics/seller-statistics.component';

const routes: Routes = [{
  path: '', component: SellerProfileComponent, children: [
    {
      path: '', redirectTo: 'info', pathMatch: 'full'
    },
    {
      path: 'info', component: SellerInfoComponent
    },
    {
      path: 'settings', component: SellerSettingsComponent
    },
    {
      path: 'statistics', component: SellerStatisticsComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerProfileRoutingModule {
}
