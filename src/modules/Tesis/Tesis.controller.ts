import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { TesisService } from "./Tesis.service";
import { Response } from "express";

@Controller('estudiante/tesis')
export class TesisController{
    constructor (
        private readonly tesisService: TesisService
    ){}

    @Get('obtener/todo')
    async obtenerTesises(@Res() res: Response){
        try {
            const resultado = await this.tesisService.obtenerTesises();
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Get('obtener/contenido/:idTesis')
    async obtenerTesisContenido(@Param('idTesis') idTesis,@Res() res: Response){
        try {
            const resultado = await this.tesisService.obtenerContenido(idTesis);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Post('ingresar')
    async ingresarTesis(@Body() data, @Res() res: Response){
        try {
            const resultado = await this.tesisService.ingresarTesis(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}