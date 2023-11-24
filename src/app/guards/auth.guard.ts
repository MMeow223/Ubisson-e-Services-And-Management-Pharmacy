import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { authorisedFetch } from '../helper/apiHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem("token") != null) {
      authorisedFetch('v1/pharmacist/user', 'GET').then(async (res) => {
        if (!(res?.status === 200 || res?.status === 429)) {
          await authorisedFetch('v1/pharmacist/logout', 'POST');
          localStorage.removeItem('token');
          this.router.navigate(['/page-login'], { replaceUrl: true });
        }
      });
      return true; 
    } else {
      this.router.navigate(['/page-login'], { replaceUrl: true });
      return false; 
    }
  }
}
