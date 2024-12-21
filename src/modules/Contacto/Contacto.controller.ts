import { Body, Controller, Get, Post, Put, Res } from "@nestjs/common";
import { ContactoService } from "./Contacto.service";
import { Response } from "express";

@Controller('contacto')
export class ContactoController {
    constructor(
        private readonly contactoService: ContactoService
    ){}

    @Get('obtener')
    async obtenerContactos(@Res() res: Response){
        try {
            const resultado = await this.contactoService.obtenerContactos();
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Post('agregar')
    async agregarContacto(@Body() data, @Res() res: Response){
        try {
            const resultado = await this.contactoService.ingresarContacto(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Put('eliminar')
    async eliminarContacto(@Body() data, @Res() res: Response){
        try {
            const resultado = await this.contactoService.eliminarContacto(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Put('actualizar')
    async actualizarContacto(@Body() data, @Res() res: Response){
        try {
            const resultado = await this.contactoService.actualizarContacto(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}