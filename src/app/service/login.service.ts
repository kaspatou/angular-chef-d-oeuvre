import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';
import {JsonWebToken} from '../model/jwt.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userRoles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.getUserRoles();
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem(environment.accessToken) !== null;
  }

  signIn(user: User) {
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'user/sign-in', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);

        this.getUserRoles();

        this.router.navigate(['/accueil']);
      },
      error => console.log('Error while login'));
  }

  signOut() {
    sessionStorage.removeItem(environment.accessToken);
  }

  private getUserRoles() {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      const authorities: Array<any> = decodedToken.auth;
      this.userRoles.next(authorities.map(authority => authority.authority));
      console.log(decodedToken);
    }
  }
}
