import { contenido } from "./Contenido";
import { Materia } from "./Materia";

export interface InformesAlumnoDto {
    id: number;
    profesorNombre: string;
    asignatura: Materia;
    contenidosAdeudados: contenido []
}