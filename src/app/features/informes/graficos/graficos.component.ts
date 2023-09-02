import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Informes } from 'src/app/core/Entities/informe';
import { InformesService } from 'src/app/core/services/informes.service';
import { __values } from 'tslib';
interface anio {
  value: string;
  viewValue: string;
}
interface materiaInforme {
  materia: string;
  numInforme: number;
}
interface cicloLectivo {
  value: string;
  
}
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  anios: anio[] = [
    {value: '1', viewValue: 'Primer'},
    {value: '2', viewValue: 'Segundo'},
    {value: '3', viewValue: 'Tercer'},
    {value: '4', viewValue: 'Cuarto'},
    {value: '5', viewValue: 'Quinto'},
    {value: '6', viewValue: 'Sexto'},

  ];
  ciclos: cicloLectivo[] = [
    {value: '2023'},
    {value: '2024'},

    {value: '2025'},
    {value: '2026'},
    {value: '2027'},

  ]
  materiasPrimeroSegundo:any[] =['MATEMÁTICA', 'FÍSICA', 'QUÍMICA', 'LENGUA','HISTORIA', 'GEOGRAFÍA', 'FEC', 'INGLES','BIOLOGÍA','DIBUJO TECNICO'];
  materiasTercero:any[] =['MATEMÁTICA', 'FÍSICA APLICADA', 'QUÍMICA APLICADA', 'SEGURIDAD E HIGIENE','HISTORIA', 'GEOGRAFÍA', 'FEC', 'INGLES','DIBUJO TEC'];
  
  numInformes:number[] =[];
  materiasInformes1:materiaInforme[] =[]
  materiasInformes2:materiaInforme[] =[]
  materiasInformes3:materiaInforme[] =[]


  anio: string = '1'
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

  constructor(private informeService: InformesService) { 
  this.cargarDatos('1',this.materiasInformes1, this.materiasPrimeroSegundo)
  this.cargarDatos('2',this.materiasInformes2, this.materiasPrimeroSegundo)
  this.cargarDatos('3',this.materiasInformes3, this.materiasTercero)
   
  }

  cargarDatos(anio:string, materiasAnio:materiaInforme[], nombreMaterias:string[]): void {
    
    nombreMaterias.forEach(materia=>{
      this.informeService.numInformesPorMateria(materia,anio).subscribe({
        next: data=>{
          
          const numInf : materiaInforme = {
            materia: materia,
            numInforme: data
          }
          materiasAnio.push(numInf)
         
        }
      })
    })
   
    
  }

  ngOnInit(): void {
   
  }
  ngAfterViewInit() {
  setTimeout(() => {
    this.RenderChart1(this.materiasInformes1)
    this.RenderChart2(this.materiasInformes2)
    this.RenderChart3(this.materiasInformes3)
    this.RenderChart4(this.materiasInformes1)
    this.RenderChart5(this.materiasInformes1)
    this.RenderChart6(this.materiasInformes1)
  
  }, 100);
  

   
}

RenderChart1(data: materiaInforme[]): void { 

  this.canvas = this.mychart.nativeElement;
  this.ctx = this.canvas.getContext('2d');

  new Chart(this.ctx, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 1° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: data.map(inf=>inf.numInforme),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              borderWidth: 1
          }],
          labels: data.map(inf=>inf.materia)
      },
  });
}

RenderChart2(data: materiaInforme[]): void { 
  this.canvas2 = this.mychart2.nativeElement;
  this.ctx2 = this.canvas2.getContext('2d');

  new Chart(this.ctx2, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 2° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: data.map(inf=>inf.numInforme),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              borderWidth: 1
          }],
          labels: data.map(inf=>inf.materia)
      },
  });
}

RenderChart3(data: materiaInforme[]): void { 
  this.canvas3 = this.mychart3.nativeElement;
  this.ctx3 = this.canvas3.getContext('2d');

  new Chart(this.ctx3, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 3° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: data.map(inf=>inf.numInforme),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              borderWidth: 1
          }],
          labels: data.map(inf=>inf.materia)
      },
  });
}

RenderChart4(data: materiaInforme[]): void { 
  this.canvas4 = this.mychart4.nativeElement;
  this.ctx4 = this.canvas4.getContext('2d');

  new Chart(this.ctx4, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 4° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: data.map(inf=>inf.numInforme),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              borderWidth: 1
          }],
          labels: data.map(inf=>inf.materia)
      },
  });
}
RenderChart5(data: materiaInforme[]): void { 
  this.canvas5 = this.mychart5.nativeElement;
  this.ctx5 = this.canvas5.getContext('2d');

  new Chart(this.ctx5, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 5° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: data.map(inf=>inf.numInforme),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              borderWidth: 1
          }],
          labels: data.map(inf=>inf.materia)
      },
  });
}

RenderChart6(data: materiaInforme[]): void { 
  this.canvas6 = this.mychart6.nativeElement;
  this.ctx6 = this.canvas6.getContext('2d');

  new Chart(this.ctx6, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: ' 6° Año'
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        }
      },
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: data.map(inf=>inf.numInforme),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              borderWidth: 1
          }],
          labels: data.map(inf=>inf.materia)
      },
  });
}
  
}
