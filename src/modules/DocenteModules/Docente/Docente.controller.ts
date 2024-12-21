import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
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
            const resultado = await this.docenteService.obtenerDocentesTodo(idTitulo);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Post('obtener')
    async obtenerDocentes(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.docenteService.obtenerDocentesSinUsuario(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Put('eliminar')
    async eliminarDocente(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.docenteService.eliminarDoccente(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}