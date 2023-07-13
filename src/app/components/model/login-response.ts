export class LoginResponse {
  public username: string;
  public token: string;
  public role: Role;


  constructor(username: string, token: string, role: Role) {
    this.username = username;
    this.token = token;
    this.role = role;
  }
}
enum Role {
  User = "USER",
  Admin = "Admin"
}
