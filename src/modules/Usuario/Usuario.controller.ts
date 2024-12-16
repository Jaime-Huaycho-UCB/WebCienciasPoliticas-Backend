import { Body, Controller, Post, Res } from "@nestjs/common";
import { UsuarioService } from "./Usuario.service";
import { Response } from "express";

@Controller('usuario')
export class UsuarioController {
    constructor (
        private readonly usuarioService: UsuarioService
    ){}

    @Post('inicioSesion')
    async iniciarSesion(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.usuarioService.iniciarSesion(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}