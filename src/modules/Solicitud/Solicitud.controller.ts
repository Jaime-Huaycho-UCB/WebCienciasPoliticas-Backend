import { Body, Controller, Post, Put, Res } from "@nestjs/common";
import { SolicitudService } from "./Solicitud.service";
import { Response, response } from "express";

@Controller('solicitud')
export class SolicitudController {
    constructor(
        private readonly solicitudService: SolicitudService
    ){}

    @Post('responder')
    async responserSolicitud(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.solicitudService.responderSolicitud(data);
            console.log(resultado);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salid: false,
                mensaje: error.message
            });
        }
    }

    @Post('obtener')
    async obtenerSolicitudes(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.solicitudService.obtenerSolicitudes(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salid: false,
                mensaje: error.message
            });
        }
    }

    @Post('enviar')
    async enviarSolicitud(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.solicitudService.enviarSolicitud(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salid: false,
                mensaje: error.message
            });
        }
    }

    @Put('eliminar')
    async eliminarSolicitud(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.solicitudService.eliminarSolicitud(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salid: false,
                mensaje: error.message
            });
        }
    }
}