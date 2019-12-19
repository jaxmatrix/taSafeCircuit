import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isLoggedIn()) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;

    }

  constructor(
    private router: Router,
  ) {}

  public isLoggedIn(): boolean {
    let status = false;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      status = true;
    } else {
      status = false;
    }

    return status;
  }
}
