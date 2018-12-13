import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: UserService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
        this.auth.logout();
        return false;
    }
    return true;
  }
}
