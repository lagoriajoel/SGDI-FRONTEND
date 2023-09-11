
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoDto } from '../../Entities/CursoDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  

    cursoURL = environment.apiURL+'/cursos/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<CursoDto[]> {
    return this.httpClient.get<CursoDto[]>(this.cursoURL + 'list');
  }

  public detail(id: number): Observable<CursoDto> {
    return this.httpClient.get<CursoDto>(this.cursoURL + `list/${id}`);
  }

 
  public save(cursoDto: CursoDto): Observable<any> {
    return this.httpClient.post<any>(this.cursoURL + 'save', cursoDto);
  }

  public update(id: number, curso: CursoDto): Observable<any> {
    return this.httpClient.put<any>(this.cursoURL + `update/${id}`, curso);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.cursoURL + `delete/${id}`);
  }
   }

