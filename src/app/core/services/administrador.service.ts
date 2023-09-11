import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from '../Entities/administrador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {


  AdminURL = environment.apiURL+'/admin/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Administrador[]> {
    return this.httpClient.get<Administrador[]>(this.AdminURL + 'list');
  }

  

  public listaPorDni(dni: string): Observable<Administrador> {
    return this.httpClient.get<Administrador>(this.AdminURL + `listOfDni/${dni}`);
  }

  public detail(id: number): Observable<Administrador> {
    return this.httpClient.get<Administrador>(this.AdminURL + `list/${id}`);
  }

 
  public save(admin: Administrador): Observable<any> {
    return this.httpClient.post<any>(this.AdminURL + 'save', admin);
  }

  public update(id: number, admin: Administrador): Observable<any> {
    return this.httpClient.put<any>(this.AdminURL + `update/${id}`, admin);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.AdminURL + `delete/${id}`);
  }

  
}
