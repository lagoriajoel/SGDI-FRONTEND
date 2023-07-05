import { contenido } from "./Contenido";
import { Materia } from "./Materia";

import { AlumnoInforme } from "./alumnoInforme";
import { criterioDto } from "./criterioDTO";
import { estrategiaDto } from "./estrategiaDto";
import { MateriaContenido } from "./materiaContenido";


export interface Informes {
    id: number;
    criteriosEvaluacion: criterioDto[]
    estrategiasEvaluacion: estrategiaDto[]
    profesorNombre: string;
    asignatura: MateriaContenido;
    alumno: AlumnoInforme
    contenidosAdeudados: contenido []
}