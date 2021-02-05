import {GoodsSellerSettingResponse} from './goods-seller-setting-response';

export class GoodsSellerDataResponse {
    id = 0;
    shopName = '';
    avatar = '';

    settings = new GoodsSellerSettingResponse();
}
