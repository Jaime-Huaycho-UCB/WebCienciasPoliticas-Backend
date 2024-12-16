import { Controller } from "@nestjs/common";
import { NivelAcademicoService } from "./NivelAcademico.service";

@Controller('')
export class NivelAcademicoController {
    constructor (
        private readonly nivelAcademicoService: NivelAcademicoService
    ){}
}