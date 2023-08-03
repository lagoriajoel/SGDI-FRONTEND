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

      
         if(this.authService.isProfesor()) {
            this.realRol = 'profesor';
         }
         else if(this.authService.isAdmin()) {
          this.realRol = 'admin' 
         }
         else if(this.authService.isDirectivo()) {
          this.realRol = 'directivo' 
         }
         else {
          this.realRol='user'
         }

        
        if (!this.authService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
          this.router.navigate(['auth/login']);
          console.log(this.realRol);
          return false;
        }
        return true;
      }

       
    
}
