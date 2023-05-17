import { contenido } from "./Contenido";
import { CursoDto } from "./CursoDto";
import { Alumno } from "./alumno";
import { AlumnoInforme } from "./alumnoInforme";
import { cursoAlumno } from "./cursoAlumno";

export interface Informes {
    descripcion: string;
    curso: cursoAlumno
    alumno: AlumnoInforme
    contenidosAdeudados: contenido []
}