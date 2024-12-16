import { Controller } from "@nestjs/common";
import { EstudianteService } from "./Estudiante.service";

@Controller('estudiante')
export class EstudianteController {
    constructor (
        private readonly estudianteService: EstudianteService
    ){}
}