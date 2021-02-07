export class GlobalConstants {
  // public static API_URL = 'http://localhost:8080/';
  public static API_URL = 'http://192.168.31.128:8080/';
  // public static API_URL = 'http://192.168.0.196:8080/';
  // public static API_URL = 'http://192.168.1.104:8080/';

  public static getRequestAuthorizationHeader(): any {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('andro_user_token')
    };
  }
}
