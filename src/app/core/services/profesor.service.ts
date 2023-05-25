import { AboutModule } from './../../features/about/about.module';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../Entities/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {


  profesorURL = 'http://localhost:8001/profesor/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Profesor[]> {
    return this.httpClient.get<Profesor[]>(this.profesorURL + 'list');
  }

  public listarCurso(id: number): Observable<Profesor[]> {
    return this.httpClient.get<Profesor[]>(this.profesorURL + `listOfCurso/${id}` );
  }

  public listaPorDni(dni: string): Observable<Profesor> {
    return this.httpClient.get<Profesor>(this.profesorURL + `listOfDni/${dni}`);
  }

  public detail(id: number): Observable<Profesor> {
    return this.httpClient.get<Profesor>(this.profesorURL + `list/${id}`);
  }

 
  public save(profesor: Profesor): Observable<any> {
    return this.httpClient.post<any>(this.profesorURL + 'save', profesor);
  }

  public update(id: number, profesor: Profesor): Observable<any> {
    return this.httpClient.put<any>(this.profesorURL + `update/${id}`, profesor);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.profesorURL + `delete/${id}`);
  }

  
}
