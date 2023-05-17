import { MateriaContenido } from "./materiaContenido";
import { Materias } from "./materias";

export interface contenido {
        
    id: number;
    nombre: string;
    descripcion: string;
    asignatura: MateriaContenido
}