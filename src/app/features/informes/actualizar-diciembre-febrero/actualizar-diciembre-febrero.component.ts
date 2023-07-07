import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-diciembre-febrero',
  templateUrl: './actualizar-diciembre-febrero.component.html',
  styleUrls: ['./actualizar-diciembre-febrero.component.css']
})
export class ActualizarDiciembreFebreroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ver(){
    alert("Actualizar");
  }
}
