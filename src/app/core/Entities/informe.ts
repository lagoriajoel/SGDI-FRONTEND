import { contenido } from "./Contenido";

import { AlumnoInforme } from "./alumnoInforme";


export interface Informes {
    descripcion: string;
    alumno: AlumnoInforme
    id_asignatura: number;
    contenidosAdeudados: contenido []
}