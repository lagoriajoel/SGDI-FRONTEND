import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { InformesService } from 'src/app/core/services/informes.service';
interface materiaInforme {
  materia: string;
  numInforme: number;
}
interface datos {
  estado: string;
  numInforme: number;
}
@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html',
  styleUrls: ['./grafico2.component.css']
})
export class Grafico2Component implements OnInit {
 desaprobados!: number
 totalAlumnos!: number
 aprobados: number=0
 labels: string[] = ["Aprobados", "Desaprobados"];
 datos: any[] = []

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  canvas2: any;
  ctx2: any;
  @ViewChild('mychart2') mychart2: any;
  canvas3: any;
  ctx3: any;
  @ViewChild('mychart3') mychart3: any;
  canvas4: any;
  ctx4: any;
  @ViewChild('mychart4') mychart4: any;
  canvas5: any;
  ctx5: any;
  @ViewChild('mychart5') mychart5: any;
  canvas6: any;
  ctx6: any;
  @ViewChild('mychart6') mychart6: any;

  materiasInformes1:materiaInforme[] =[]
  constructor(private informeService: InformesService,
    private alumnoService: AlumnoService) {
     this.cargarDatos('1')
     
     }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
   
    setTimeout(() => {
      
      this.RenderChart(this.labels, this.datos)
      this.RenderChart2(this.labels, this.datos)
      this.RenderChart3(this.labels, this.datos)
      this.RenderChart4(this.labels, this.datos)
      this.RenderChart5(this.labels, this.datos)
      this.RenderChart6(this.labels, this.datos)

     
    }, 2000);
    
     
  }
  cargarDatos(anio: string) {
   this.alumnoService.cantidadDeAlumnosAnio(anio).subscribe({
    next: data=>{
      
      this.totalAlumnos = data
      
      this.datos.push(data)
    }
   })
   this.informeService.numAlumnosConInformesAnio(anio).subscribe({
    next: data=>{
     
      this.desaprobados=data
      console.log(this.desaprobados);
       const aprobados= this.totalAlumnos-data  
       this.datos.push(aprobados)
     
    }
   })
        

   
  }

  RenderChart(labels:any[], data:any[]): void { 

    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  
    new Chart(this.ctx, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Informes de Desempeño',
                data:  data,
                backgroundColor: [ "#2ab881", "#4f81bd"],
               
                fill: true,
               

            }],
            labels: labels,
            
        },
        options: {
          title: {
            display: true,
            text: 'Alumnos de 1° Año'
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            
          }
        },
    });
  }
  RenderChart2(labels:any[], data:any[]): void { 

    this.canvas2 = this.mychart2.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');
  
    new Chart(this.ctx2, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Informes de Desempeño',
                data:  data,
                backgroundColor: [ "#2ab881", "#4f81bd"],
                fill: true,
               

            }],
            labels: labels,
            
        },
        options: {
          title: {
            display: true,
            text: 'Alumnos de 2° Año'
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            
          }
        },
    });
  }
  RenderChart3(labels:any[], data:any[]): void { 

    this.canvas3 = this.mychart3.nativeElement;
    this.ctx3 = this.canvas3.getContext('2d');
  
    new Chart(this.ctx3, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Informes de Desempeño',
                data:  data,
                backgroundColor: [ "#2ab881", "#4f81bd"],
                fill: true,
               

            }],
            labels: labels,
            
        },
        options: {
          title: {
            display: true,
            text: 'Alumnos de 3° Año'
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            
          }
        },
    });
  }
  RenderChart4(labels:any[], data:any[]): void { 

    this.canvas4 = this.mychart4.nativeElement;
    this.ctx4 = this.canvas4.getContext('2d');
  
    new Chart(this.ctx4, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Informes de Desempeño',
                data:  data,
                backgroundColor: [ "#2ab881", "#4f81bd"],
                fill: true,
               

            }],
            labels: labels,
            
        },
        options: {
          title: {
            display: true,
            text: 'Alumnos de 4° Año'
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            
          }
        },
    });
  }
  RenderChart5(labels:any[], data:any[]): void { 

    this.canvas5 = this.mychart5.nativeElement;
    this.ctx5 = this.canvas5.getContext('2d');
  
    new Chart(this.ctx5, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Informes de Desempeño',
                data:  data,
                backgroundColor: [ "#2ab881", "#4f81bd"],
                fill: true,
               

            }],
            labels: labels,
            
        },
        options: {
          title: {
            display: true,
            text: 'Alumnos de 5° Año'
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            
          }
        },
    });
  }
  RenderChart6(labels:any[], data:any[]): void { 

    this.canvas6 = this.mychart6.nativeElement;
    this.ctx6 = this.canvas6.getContext('2d');
  
    new Chart(this.ctx6, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Informes de Desempeño',
                data:  data,
                backgroundColor: [ "#2ab881", "#4f81bd"],
                fill: true,
               

            }],
            labels: labels,
            
        },
        options: {
          title: {
            display: true,
            text: 'Alumnos de 6° Año'
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            
          }
        },
    });
  }
  
}


