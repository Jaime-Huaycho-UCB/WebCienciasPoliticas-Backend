import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { DocenteService } from "./Docente.service";
import { Response } from "express";

@Controller('docente')
export class DocenteController {
    constructor(
        private readonly docenteService: DocenteService
    ){}

    @Post('agregar')
    async agregarDocente(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.docenteService.agregarDocente(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Get('obtener/todo/:idTitulo')
    async obtenerDocentesTodo(@Param('idTitulo') idTitulo,@Res() res: Response){
        try {
            const resultado = await this.docenteService.obtenerDocentes(idTitulo);
            console.log(resultado);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}