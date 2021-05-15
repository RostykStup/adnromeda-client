import {Component, OnInit} from '@angular/core';
import {GoodsAdvertisementSearchRequest} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-search-request';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GoodsAdvertisementForSearchResponse} from '../../../entity/advertisement/goodsAdvertisement/goods-advertisement-for-search-response';
import {CurrencyResponse} from '../../../entity/country/currency-response';
import {CurrencyService} from '../../../service/country/currency.service';
import {PaginationRequest} from '../../../entity/pagination-request';
import {AccountService} from '../../../service/account/account.service';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {NavigationService} from '../../../common/navigation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../styles/input.scss', './search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private dialog: MatDialog,
              private navigationService: NavigationService) {
  }

  searchValue = '';
  searchRequest = new GoodsAdvertisementSearchRequest();

  advertisements = Array<GoodsAdvertisementForSearchResponse>();

  totalPages = 0;
  totalElements = 0;


  ngOnInit(): void {
    // @ts-ignore
    this.searchValue = this.activatedRoute.snapshot.queryParamMap.get('value');
    if (this.activatedRoute.snapshot.queryParamMap.get('page') == null) {
      this.searchRequest.pagination.size = 50;
    } else {
      this.searchRequest.pagination = this.navigationService.getPaginationFromCurrentRoute();
    }
    this.searchRequest.pagination.size = 60;
    this.loadAdvertisements();

  }

  loadAdvertisements(): void {
    this.advertisementService.findAllByFilters(this.searchRequest).subscribe((r) => {
      this.advertisements = r.data;
    });
  }

}
