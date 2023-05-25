import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { of, EMPTY, Observable } from 'rxjs';
import { JwtDTO } from '../Entities/JwtDTO';
import { Router } from '@angular/router';
const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authURL = 'http://localhost:8001/auth/';

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage, private router: Router) {
    }

    
    public login(userName:string, password:string): Observable<JwtDTO> {

        const loginUsuario= new LoginUsuario(userName, password)
        return this.http.post<JwtDTO>(this.authURL + 'login', loginUsuario);
      }
      public refresh(dto: JwtDTO): Observable<JwtDTO> {
        return this.http.post<JwtDTO>(this.authURL + 'refresh', dto);
      }
    
    
   

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.clear()
        this.router.navigate(['/auth/login']);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY)!;
      }
    
    public setToken(token: string): void {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
      }

    // getCurrentUser(): any {
    //     // TODO: Enable after implementation
    //     // return JSON.parse(this.localStorage.getItem('currentUser'));
    //     return {
    //         token: 'aisdnaksjdn,axmnczm',
    //         isAdmin: true,
    //         email: 'john.doe@gmail.com',
    //         id: '12312323232',
    //         alias: 'john.doe@gmail.com'.split('@')[0],
    //         expiration: moment().add(1, 'days').toDate(),
    //         fullName: 'John Doe'
    //     };
    // }

    passwordResetRequest(email: string) {
        return of(true).pipe(delay(1000));
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).pipe(delay(1000));
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).pipe(delay(1000));
    }

    public isLogged(): boolean {
        if (this.getToken()) {
          return true;
        }
        return false;
      }
    
      public getUserName(): string {
        if (!this.isLogged()) {
          return null!;
        }
        const token = this.getToken();
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);
        const values = JSON.parse(payloadDecoded);
        const username = values.nombre;
        console.log(username);
        return username;

      }
}

export class LoginUsuario {

    nombreUsuario:string
    password:string

    constructor(nombreUsuario:string, password:string){
        this.nombreUsuario=nombreUsuario
        this.password=password
    }

    

    
}