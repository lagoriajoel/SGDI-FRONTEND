import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contenido } from '../Entities/Contenido';

@Injectable({
  providedIn: 'root'
})
export class ContenidosService {

  ContenidoURL = 'http://localhost:8001/contenidos/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<contenido[]> {
    return this.httpClient.get<contenido[]>(this.ContenidoURL + 'list');
  }

  public listarContenido(id: number): Observable<contenido[]> {
    return this.httpClient.get<contenido[]>(this.ContenidoURL + `list/${id}` );
  }
  public listarContenidoPorAsignatura(idAsignatura: number): Observable<contenido[]> {
    return this.httpClient.get<contenido[]>(this.ContenidoURL + `listOfAsignatura/${idAsignatura}` );
  }

  public detail(id: number): Observable<contenido> {
    return this.httpClient.get<contenido>(this.ContenidoURL + `list/${id}`);
  }

 
  public save(contenido: contenido): Observable<any> {
    return this.httpClient.post<any>(this.ContenidoURL + 'save', contenido);
  }

  public update(id: number, contenido: contenido): Observable<any> {
    return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, contenido);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
  }
}
