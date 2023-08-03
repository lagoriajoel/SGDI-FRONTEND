import { CursoDto } from "./CursoDto";
import { InformesAlumnoDto } from "./InformeAlumnoDto";
import { Informes } from "./informe";


export interface AlumnoInformeDto {
   id: number;
    dni: number;
    nombres: string;
    apellido: string;
    email: string;
    curso: CursoDto;
    informeDesempenios : InformesAlumnoDto[]
  }