import {CurrencyResponse} from '../../country/currency-response';
import {UserSettingsResponse} from './user-settings-response';

export class UserDataResponse{
  username: string | null = null;
  avatar: string | null = null;
  settings = new UserSettingsResponse();
}
