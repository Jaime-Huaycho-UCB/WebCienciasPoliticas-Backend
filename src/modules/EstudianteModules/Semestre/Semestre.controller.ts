import { Controller, Get, Res } from "@nestjs/common";
import { SemestreService } from "./Semestre.service";
import { Response } from "express";

@Controller('estudiante/semestre')
export class SemestreController {
    constructor (
        private readonly semestreService: SemestreService
    ){}

    @Get('obtener')
    async obtenerSemestres(@Res() res: Response){
        try {
            const resultado = await this.semestreService.obtenerSemestres();
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}