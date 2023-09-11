import { contenido } from './../Entities/Contenido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informes } from '../Entities/informe';
import { Observable } from 'rxjs';
import { contenidoAdeudadoDto } from '../Entities/contenidoAdeudadoDto';
import { InformeContenidoDto } from '../Entities/informeContenidosDto';
import { contenidoInformeDto } from '../Entities/contenidoInformeDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  informeURL = environment.apiURL+'/informes/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Informes[]> {
    return this.httpClient.get<Informes[]>(this.informeURL + 'list');
  }
  public listarPorMaterias(nombre:string, anio:string): Observable<Informes[]> {
    return this.httpClient.get<Informes[]>(this.informeURL + `listOfNombreAsignatura/${nombre}/${anio}`);
  }

  public listarPorAnioCurso(anio:string): Observable<Informes[]> {
    return this.httpClient.get<Informes[]>(this.informeURL + `listOfAnioCurso/${anio}`);
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
  public actualizarContenidoDiciembre( contenidos: contenidoAdeudadoDto[]): Observable<any> {
    return this.httpClient.put<any>(this.informeURL + `actualizarContenidoDiciembre/`, contenidos);
  }
  public actualizarContenidoFebrero( contenidos: contenidoAdeudadoDto[]): Observable<any> {
    return this.httpClient.put<any>(this.informeURL + `actualizarContenidoFebrero/`, contenidos);
  }
  public actualizarContenidoExamen( contenidos: contenidoInformeDto[]): Observable<any> {
    return this.httpClient.put<any>(this.informeURL + `actualizarContenidoExamen/`, contenidos);
  }

  public actualizarInformeMesa( informe: InformeContenidoDto, idInforme: number): Observable<any> {
    return this.httpClient.put<any>(this.informeURL + `actualizarInformeMesa/${idInforme}`, informe);
  }

  public asignarContenido(id: number, contenidoId: number): Observable<any> {
    return this.httpClient.put<any>(this.informeURL + `list/${id}/contenido/${contenidoId}`, null);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.informeURL + `delete/${id}`);
  }
  public numInformesPorMateria(materia: string, anio:string): Observable<any> {
    return this.httpClient.get<any>(this.informeURL + `numInformesMateria/${materia}/${anio}`);
  }
  public numAlumnosConInformesAnio( anio:string): Observable<any> {
    return this.httpClient.get<any>(this.informeURL + `numAlumnosConInformePorAnio/${anio}`);
  }
}
