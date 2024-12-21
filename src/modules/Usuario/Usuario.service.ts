import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./Usuario.entity";
import { Repository } from "typeorm";
import { Body, forwardRef, Inject, Res } from "@nestjs/common";
import { DocenteService } from "../DocenteModules/Docente/Docente.service";
import { TokenService } from "../Token/Token.service";

export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @Inject(forwardRef(()=>DocenteService))
        private readonly docenteService: DocenteService,
        private readonly tokenService: TokenService
    ){}

    async iniciarSesion(@Body() data){
        try {
            const {correo,contrasena} = data;
            const docente = await this.docenteService.existeCorreo(correo);
            if (docente==null){
                return {
                    salida: false,
                    mensaje: "El usuario ingrsado no se encuentra registrado"
                }
            }
            const usuario = await this.existeUsuario(docente.id);
            if (usuario==null){
                return {
                    salida: false,
                    mensaje: "El docente no esta registrado como usuario"
                }
            }

            if (contrasena != usuario.contrasena){
                return {
                    salida: false,
                    mensaje: "Contrasena incorrecta"
                }
            }

            const token = await this.tokenService.crearToken(usuario.id);
            if (!(token.salida)){
                return token;
            }

            return {
                salida: true,
                mensaje: "Inicio de sion exitoso",
                idUsuario: usuario.id,
                permiso: usuario.permiso,
                idDocente: docente.id,
                token: token.token
            };
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async existeUsuario(idDocente){
        const usuario = await this.usuarioRepository.findOne({where: {
            docente: idDocente,
            Eliminado: 0
        }});
        if (usuario){
            return usuario;
        }else{
            return null;
        }
    }

    async eliminarUsuario(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }

            const {id} = data;
            const usuario = await this.usuarioRepository.findOne({where: {id: id}});
            usuario.Eliminado = 1;
            
            const eliminar = await this.tokenService.eliminarToken(id);
            if (!(eliminar)){
                return eliminar;
            }
            await this.usuarioRepository.save(usuario);

            return {
                salida: true,
                mensaje: "Se elimino exitosamente al usuario"
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async crearUsuario(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }

            const {idDocente,password} = data;
            const usuario = new Usuario();
            usuario.docente = idDocente;
            usuario.contrasena = password;
            usuario.permiso = 0;
            const usuarioGuardado = await this.usuarioRepository.save(usuario);

            const inicializarToken = await this.tokenService.inicializarToken(usuarioGuardado.id);
            if (!(inicializarToken.salida)){
                return inicializarToken;
            }

            return {
                salida: true,
                mensaje: "Se registro exitosmente al docente"
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async obtenerUsuarios(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }

            const usuarios = await this.usuarioRepository
            .createQueryBuilder('u')
            .addFrom('DOCENTE','d')
            .addFrom('TITULO','t')
            .where('d.id = u.docente')
            .andWhere('u.permiso = 0')
            .andWhere('d.Eliminado = 0')
            .andWhere('t.id = d.titulo')
            .select([
                'd.id As id',
                'd.nombre As nombre',
                'd.correo As correo',
                't.nombre As titulo',
                'd.frase As frase'
            ]).getRawMany();

            if (usuarios.length==0){
                throw new Error('No hay usuario disponibles');
            }

            return {
                salida: true,
                usuarios: usuarios
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async cambiarContrasena(data){
        try {
            const {correo,contrasena} = data;
            const docente = await this.docenteService.existeCorreo(correo);
            if (docente==null){
                throw new Error('No se encontro el correo ingresado');
            }

            const usuario = await this.usuarioRepository.findOne({where: {
                docente: docente.id,
                Eliminado: 0
            }});

            if (!(docente)){
                throw new Error('No se encontro el usuario');
            }

            usuario.contrasena  =contrasena;

            await this.usuarioRepository.save(usuario);

            return {
                salida: true,
                mensaje: "La contrasena se restablecio exitosamente"
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }
}