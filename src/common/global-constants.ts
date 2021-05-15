export class GlobalConstants {
  // public static API_URL = 'http://localhost:8080/';
  public static API_URL = 'http://192.168.31.128:8080/';
  // public static API_URL = 'http://192.168.43.11:8080/';
  // public static API_URL = 'http://192.168.0.196:8080/';
  // public static API_URL = 'http://192.168.1.104:8080/';

  public static getUserRole(): any {
    const role = localStorage.getItem('andro_user_role');
    if (role == null || role === '') {
      return 'ROLE_GUEST';
    } else {
      return role;
    }
  }
}
