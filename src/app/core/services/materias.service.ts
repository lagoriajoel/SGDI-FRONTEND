import { MateriasDto } from './../Entities/materias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  materiasURL = 'http://localhost:8001/asignaturas/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<MateriasDto[]> {
    return this.httpClient.get<MateriasDto[]>(this.materiasURL + 'list');
  }

  public listarCurso(id: number): Observable<MateriasDto[]> {
    return this.httpClient.get<MateriasDto[]>(this.materiasURL + `listOfCurso/${id}` );
  }
  public listarPorProfesor(id: number): Observable<MateriasDto[]> {
    return this.httpClient.get<MateriasDto[]>(this.materiasURL + `listOfProfesor/${id}` );
  }

  public detail(id: number): Observable<MateriasDto> {
    return this.httpClient.get<MateriasDto>(this.materiasURL + `list/${id}`);
  }
  public asignarAsignatura(idProfesor: number, idAsignatura: number): Observable<any> {
    return this.httpClient.put<any>(this.materiasURL + `asignar/${idProfesor}/Asignatura/${idAsignatura}`, null);
  }
 
  public save(materias: MateriasDto): Observable<any> {
    return this.httpClient.post<any>(this.materiasURL + 'save', materias);
  }

  public update(id: number, materias: MateriasDto): Observable<any> {
    return this.httpClient.put<any>(this.materiasURL + `update/${id}`, materias);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.materiasURL + `delete/${id}`);
  }
}
