import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { JwtDTO } from '../Entities/JwtDTO';
import { Router } from '@angular/router';
import { changePasswordDto } from '../Entities/changePasswordDto';
import { usuario } from '../Entities/usuario';
import { environment } from 'src/environments/environment';
const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    

    authURL = environment.apiURL+'/auth/';

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
    
      public changePassword(passwordDto: changePasswordDto, nombreUsuario: string): Observable<any> {
           return this.http.put<any>(this.authURL + `changePassword/${nombreUsuario}`, passwordDto);
       }
       public blanquearPassword(passwordDto: changePasswordDto, nombreUsuario: string): Observable<any> {
        return this.http.put<any>(this.authURL + `blanquearPassword/${nombreUsuario}`, passwordDto);
    }
       public listByUsername(nombreUsuario: string): Observable<usuario> {
        return this.http.get<usuario>(this.authURL + `list/${nombreUsuario}`);
    }
    
   

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.clear()
        this.router.navigate(['/auth/login']);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY)!;
      }
    
    public setToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
      }

   

    passwordResetRequest(email: string) {
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
        const username = values.sub;
        return username;

      }

      public getName(): string {
        if (!this.isLogged()) {
          return null!;
        }
        const token = this.getToken();
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);
        const values = JSON.parse(payloadDecoded);
        const name = values.nombre;
        return name;

      }


      isAdmin(): boolean {
        if (!this.isLogged()) {
          return false;
        }
        const token = this.getToken();
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);
        const values = JSON.parse(payloadDecoded);
        const roles = values.roles;
         
       if(roles.indexOf("ROLE_ADMIN") < 0){
        return false
       }
        return true
      }

      isProfesor(): boolean {
        if (!this.isLogged()) {
          return false;
        }
        const token = this.getToken();
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);
        const values = JSON.parse(payloadDecoded);
        const roles = values.roles;
         
       if(roles.indexOf("ROLE_PROFESOR") < 0){
        return false
       }
        return true
    }
    isDirectivo(): boolean {
      if (!this.isLogged()) {
        return false;
      }
      const token = this.getToken();
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
       
     if(roles.indexOf("ROLE_DIRECTIVO") < 0){
      return false
     }
      return true
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