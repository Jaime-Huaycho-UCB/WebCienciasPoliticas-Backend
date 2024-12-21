import { Body, Controller, Post, Put, Res } from "@nestjs/common";
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

    @Put('eliminar')
    async eliminarUsuario(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.usuarioService.eliminarUsuario(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Post('crear')
    async crearUsuario(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.usuarioService.crearUsuario(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Post('obtener')
    async obtenerUsuarios(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.usuarioService.obtenerUsuarios(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }

    @Post('cambiar/contrasena')
    async cambiarContrasena(@Body() data,@Res() res: Response){
        try {
            const resultado = await this.usuarioService.cambiarContrasena(data);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(200).json({
                salida: false,
                mensaje: error.message
            });
        }
    }
}