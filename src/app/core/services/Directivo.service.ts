import { AboutModule } from './../../features/about/about.module';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Directivo } from '../Entities/Directivo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectivoService {


  DireURL = environment.apiURL+'/directivo/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Directivo[]> {
    return this.httpClient.get<Directivo[]>(this.DireURL + 'list');
  }

  

  public listaPorDni(dni: string): Observable<Directivo> {
    return this.httpClient.get<Directivo>(this.DireURL + `listOfDni/${dni}`);
  }

  public detail(id: number): Observable<Directivo> {
    return this.httpClient.get<Directivo>(this.DireURL + `list/${id}`);
  }

 
  public save(directivo: Directivo): Observable<any> {
    return this.httpClient.post<any>(this.DireURL + 'save', directivo);
  }

  public update(id: number, admin: Directivo): Observable<any> {
    return this.httpClient.put<any>(this.DireURL + `update/${id}`, admin);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.DireURL + `delete/${id}`);
  }

  
}
