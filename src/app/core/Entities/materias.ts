import { CursoDto } from "./CursoDto";
import { cursoAlumno } from "./cursoAlumno";
import { Profesor } from "./profesor";

export interface MateriasDto {
    asignatura_id:number
    nombre: string;
    anioCurso:string;
    curso: CursoDto;
    profesor: Profesor;

}