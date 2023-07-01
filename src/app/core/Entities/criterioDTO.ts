import { MateriaContenido } from "./materiaContenido"
import { MateriasDto } from "./materias"

export interface criterioDto {
    id: number
    criterio: string
    asignatura: MateriaContenido
}