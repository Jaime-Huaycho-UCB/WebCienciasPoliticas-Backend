import { Controller, Get, Res } from "@nestjs/common";
import { TituloService } from "./Titulo.service";
import { Response } from "express";

@Controller('docente/titulo')
export class TituloController{
    constructor(
        private readonly tituloService: TituloService
    ){}

    @Get('obtener')
    async obtenerTitulos(@Res() res: Response){
        try {
            const respuesta = await this.tituloService.obtenerTitulos();
            return res.status(200).json(respuesta);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}