import {GoodsSellerStatisticsResponse} from './goods-seller-statistics-response';

export class GoodsSellerProfileResponse {
  id = 0;
  name = '';
  avatar = '';
  taxpayerNumber = '';

  statistics = new GoodsSellerStatisticsResponse();
}
