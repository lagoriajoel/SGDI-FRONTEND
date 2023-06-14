import { MateriaContenido } from "./materiaContenido";
import { MateriasDto } from "./materias";

export interface contenido {
        
    id: number;
    nombre: string;
    descripcion: string;
    asignatura: MateriaContenido
}