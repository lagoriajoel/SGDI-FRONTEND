import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';

@Component({
  selector: 'app-actualizar-informes',
  templateUrl: './actualizar-informes.component.html',
  styleUrls: ['./actualizar-informes.component.css']
})
export class ActualizarInformesComponent implements OnInit {
  materias: MateriasDto[] = [];
  idProfesor: number = 0;
  constructor(
    private _materiasService: MateriasService,
    private _authenticationService: AuthenticationService,
    private _profesorService: ProfesorService,
    private _router: Router

    
  ) { }

  ngOnInit() {
   
   this._profesorService.listaPorDni(this._authenticationService.getUserName()).subscribe(
    data=>{
      this.idProfesor=data.id;
           this.cargarMaterias(data.id)
    }
   )


  }
  cargarMaterias(id: number) {
    this._materiasService.listarPorProfesor(id ).subscribe((data) => {
      this.materias = data;
      console.log(data);
    });
  }
  mostrarMateria(nombreMateria:String, anio: string, id: number) {
       this._router.navigate(['/dashboardProfesor/listarInformesMaterias'], { 
        queryParams: {
          nombreMateria: nombreMateria,
          anioMateria:anio,
          idAsignatura: id

                  }
      }) 
  }
}
