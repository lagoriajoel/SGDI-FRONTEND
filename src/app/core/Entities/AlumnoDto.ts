import { cursoAlumno } from "./cursoAlumno";
import { Informes } from "./informe";



export interface AlumnoDto {
    dni: number;
    nombres: string;
    apellido: string;
    email: string;
    curso: cursoAlumno;
    informeDesempenios : Informes[]
  }