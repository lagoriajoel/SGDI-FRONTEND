import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Informes } from 'src/app/core/Entities/informe';
import { InformesService } from 'src/app/core/services/informes.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  informes: Informes[]=[];
  dataLabels:any[] =['MATEMÁTICA', 'FÍSICA', 'QUÍMICA', 'LENGUA','HISTORIA', 'GEOGRAFÍA', 'FEC', 'INGLES','BIOLOGÍA','DIBUJO TEC'];
  numInformes:number[] =[];

  anio: string = '1'
materia:string = 'fisica'
canvas: any;
ctx: any;
@ViewChild('mychart') mychart: any;
  constructor(private informeService: InformesService) { 
    this.cargarDatos();
  }

  cargarDatos(): void {

    this.dataLabels.forEach(materia=>{
      this.informeService.numInformesPorMateria(materia,this.anio).subscribe({
        next: data=>{
          console.log(data);
          this.numInformes.push(data)
         
        }
      })
    })
   
    console.log(this.numInformes);
  }

  ngOnInit(): void {
   
  }
  ngAfterViewInit() {
   
    setTimeout(() => this.RenderChart(), 2000);
   
}

RenderChart(){
  this.canvas = this.mychart.nativeElement;
  this.ctx = this.canvas.getContext('2d');

  new Chart(this.ctx, {
      type: 'bar',
      data: {
          datasets: [{
              label: 'Informes de Desempeño',
              data: this.numInformes,
              backgroundColor: "rgb(115 185 243 / 65%)",
              borderColor: "#007ee7",
              fill: true,
          }],
          labels: this.dataLabels
      },
  });
}

 
  listarInformes(materia:string, anioCurso: string){
     
    this.informeService.numInformesPorMateria(materia, anioCurso).subscribe({
      next: data=>{
        console.log(data);

      }
    })
  }
}
