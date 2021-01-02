export class GlobalConstants {
  public static API_URL = 'http://localhost:8080/';

  public static getRequestAuthorizationHeader(): any {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('andro_user_token')
    };
  }
}
