import { MateriaContenido } from "./materiaContenido";
import { MateriasDto } from "./materias";



export interface Profesor {

    id: number;
    dni: string;
    nombre: string;
    apellido:string;
    email: string;
    nombreCompleto:string; 
    asignaturas: MateriasDto[]
   
     

}