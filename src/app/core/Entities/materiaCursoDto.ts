import { CursoInforme } from "./cursoInforme";

export interface MateriasCursoDto {
    asignatura_id:number
    nombre: string;
    anioCurso:string;
    curso: CursoInforme;
    profesor: null;

}