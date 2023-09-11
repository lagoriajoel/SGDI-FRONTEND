import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { criterioDto } from '../Entities/criterioDTO';
import { criterio } from '../Entities/criterio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class criterioService {

  ContenidoURL = environment.apiURL+'/criterios/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<criterioDto[]> {
    return this.httpClient.get<criterioDto[]>(this.ContenidoURL + 'list');
  }

  public detail(id: number): Observable<criterioDto> {
    return this.httpClient.get<criterioDto>(this.ContenidoURL + `list/${id}` );
  }
  public listarContenidoPorAsignatura(idAsignatura: number): Observable<criterioDto[]> {
    return this.httpClient.get<criterioDto[]>(this.ContenidoURL + `listOfAsignatura/${idAsignatura}` );
  }

 
  public save(contenido: criterioDto): Observable<any> {
    return this.httpClient.post<any>(this.ContenidoURL + 'save', contenido);
  }

  public update(id: number, contenido: criterioDto): Observable<any> {
    return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, contenido);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
  }
}
