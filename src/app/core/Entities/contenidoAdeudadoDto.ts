import { informeIdDto } from "./informeIdDto";
import { MateriaContenido } from "./materiaContenido";

export interface contenidoAdeudadoDto {
        
    id: number;
    nombre: string;
    descripcion: string;
    asignatura: MateriaContenido
    aprobado: boolean;
    informeDesempenio: informeIdDto
    instanciaEvaluacion_diciembre: string;
    instanciaEvaluacion_febrero: string;
    instanciaEvaluacion_1: string;
    instanciaEvaluacion_2: string;
    instanciaEvaluacion_3: string;
    instanciaEvaluacion_4: string;



}