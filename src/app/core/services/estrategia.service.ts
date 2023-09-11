import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { estrategiaDto } from '../Entities/estrategiaDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class estrategiaService {

  ContenidoURL = environment.apiURL+'/estrategias/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<estrategiaDto[]> {
    return this.httpClient.get<estrategiaDto[]>(this.ContenidoURL + 'list');
  }

  public detail(id: number): Observable<estrategiaDto> {
    return this.httpClient.get<estrategiaDto>(this.ContenidoURL + `list/${id}` );
  }
  public listarContenidoPorAsignatura(idAsignatura: number): Observable<estrategiaDto[]> {
    return this.httpClient.get<estrategiaDto[]>(this.ContenidoURL + `listOfAsignatura/${idAsignatura}` );
  }

 
  public save(contenido: estrategiaDto): Observable<any> {
    return this.httpClient.post<any>(this.ContenidoURL + 'save', contenido);
  }

  public update(id: number, contenido: estrategiaDto): Observable<any> {
    return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, contenido);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
  }
}
