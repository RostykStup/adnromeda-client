export class AuthenticationResponse {
  username: string;
  id: number
  token: string;
  userRole: string;

  constructor() {
    this.userRole = '';
    this.username = '';
    this.id = 0;
    this.token = '';
  }
}
