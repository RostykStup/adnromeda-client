import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'u', pathMatch: 'full'
  },
  {
    path: 'u', loadChildren: () => {
      return import('./user/user.module').then(m => m.UserModule);
    }
  },
  {
    path: 's', loadChildren: () => {
      return import('./seller/seller.module').then(m => m.SellerModule);
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

