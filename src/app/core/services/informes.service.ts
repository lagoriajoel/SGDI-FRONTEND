import { contenido } from './../Entities/Contenido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informes } from '../Entities/informe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  informeURL = 'http://localhost:8001/informes/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Informes[]> {
    return this.httpClient.get<Informes[]>(this.informeURL + 'list');
  }

 

  public detail(id: number): Observable<Informes> {
    return this.httpClient.get<Informes>(this.informeURL + `list/${id}`);
  }

 
  public save(informe: Informes): Observable<any> {
    return this.httpClient.post<any>(this.informeURL + 'save', informe);
  }

  public update(id: number, informe: Informes): Observable<any> {
    return this.httpClient.put<any>(this.informeURL + `update/${id}`, informe);
  }

  public asignarContenido(id: number, contenidoId: number): Observable<any> {
    return this.httpClient.put<any>(this.informeURL + `list/${id}/contenido/${contenidoId}`, null);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.informeURL + `delete/${id}`);
  }
}
