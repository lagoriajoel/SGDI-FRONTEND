import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    realRol!: string;

    constructor(private router: Router,
        private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
      

        const expectedRol = route.data['expectedRol']
        this.realRol = this.authService.isAdmin() ? 'admin' : 'user';
        if (!this.authService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
          this.router.navigate(['auth/login']);
         
          return false;
        }
        return true;
      }

       
    
}
