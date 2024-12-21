import { Controller, Get, Param, Res } from "@nestjs/common";
import { EstudianteService } from "./Estudiante.service";
import { Response } from "express";

@Controller('estudiante')
export class EstudianteController {
    constructor (
        private readonly estudianteService: EstudianteService
    ){}

    @Get('obtener/:idSemestre')
    async obtenerEstudiantes(@Param('idSemestre') idSemestre,@Res() res: Response){
        console.log(idSemestre);
        try {
            const resultado = await this.estudianteService.obtenerEstudiantes(idSemestre);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}