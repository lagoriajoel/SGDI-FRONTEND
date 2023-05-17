import { Materias } from './../Entities/materias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  materiasURL = 'http://localhost:8001/asignaturas/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Materias[]> {
    return this.httpClient.get<Materias[]>(this.materiasURL + 'list');
  }

  public listarCurso(id: number): Observable<Materias[]> {
    return this.httpClient.get<Materias[]>(this.materiasURL + `listOfCurso/${id}` );
  }

  public detail(id: number): Observable<Materias> {
    return this.httpClient.get<Materias>(this.materiasURL + `list/${id}`);
  }

 
  public save(materias: Materias): Observable<any> {
    return this.httpClient.post<any>(this.materiasURL + 'save', materias);
  }

  public update(id: number, materias: Materias): Observable<any> {
    return this.httpClient.put<any>(this.materiasURL + `update/${id}`, materias);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.materiasURL + `delete/${id}`);
  }
}
