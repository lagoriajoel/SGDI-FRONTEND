import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import {catchError, concatMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { JwtDTO } from '../Entities/JwtDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService,
        private router: Router,
        private dialog: MatDialog,
        private notification: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      
       const token= this.authService.getToken();
        
            if (token) {
            
                    const cloned = req.clone({
                            headers: req.headers.set('Authorization',
                                'Bearer ' + token)
                        });
                
                        return next.handle(cloned).pipe(tap(() => { }, (err: any) => {
                                if (err instanceof HttpErrorResponse) {
                                        if (err.status === 401) {


                                            //this.notification.openSnackBar("Invalid credentials") 
                                                console.log("sesion expiradaaaaaaaaaaaaaa");
                                                this.dialog.closeAll();
                                                this.router.navigate(['/auth/login']);
                                            }
                                        }
                                    }));
                            
                                } else {
                                        return next.handle(req);
                                    }
                                }
                                
                                
                               
    // if (!this.authService.getToken()) {
    //     return next.handle(req);
    //   }
  
    //   let intReq = req;
    //   const token= this.authService.getToken();
    //   if(token!= null){
    //     intReq=req.clone({headers: req.headers.set("Authorization", 'Bearer' + token)});
    //   }
  
    //   return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
    //     if (err.status === 401) {

    //         console.log("sesion expirada");
    //         this.authService.logout();
    //         return throwError(() => new Error('test'))
    //     }
    //   }));
    // }
  
  
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];