import { cursoAlumno } from './cursoAlumno';
import { CursoDto } from "./CursoDto";
import { Informes } from './informe';

export interface Alumno {
  id: number;
  dni: number;
  nombres: string;
  apellido: string;
  email: string;
  curso: cursoAlumno;
  informeDesempenios : Informes[]
}
