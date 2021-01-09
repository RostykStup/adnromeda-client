import {CurrencyResponse} from '../../country/currency-response';

export class UserSettingsResponse {
  countryCode: string | null = null;
  currency = new CurrencyResponse();
}
