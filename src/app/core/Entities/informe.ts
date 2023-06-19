import { contenido } from "./Contenido";
import { Materia } from "./Materia";

import { AlumnoInforme } from "./alumnoInforme";
import { MateriaContenido } from "./materiaContenido";


export interface Informes {
    criteriosEvaluacion: string;
    profesorNombre: string;
    asignatura: MateriaContenido;
    alumno: AlumnoInforme
    contenidosAdeudados: contenido []
}