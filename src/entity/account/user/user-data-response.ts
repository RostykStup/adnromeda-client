
import {UserSettingsResponse} from './user-settings-response';
import {UserStatisticsResponse} from './user-statistics-response';

export class UserDataResponse{
  id = 0;
  username: string | null = null;
  avatar: string | null = null;
  settings = new UserSettingsResponse();
  statistics = new UserStatisticsResponse();
}
