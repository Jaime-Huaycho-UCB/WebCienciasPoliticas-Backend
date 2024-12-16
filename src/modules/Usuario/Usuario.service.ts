import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./Usuario.entity";
import { Repository } from "typeorm";
import { Body, Res } from "@nestjs/common";
import { DocenteService } from "../Docente/Docente.service";
import { TokenService } from "../Token/Token.service";

export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
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
                    memsaje: "El usuario ingrsado no se encuentra registrado"
                }
            }
            const usuario = await this.existeUsuario(docente.id);
            if (usuario==null){
                return {
                    salida: false,
                    memsaje: "El docente no esta registrado como usuario"
                }
            }

            if (contrasena != usuario.contrasena){
                return {
                    salida: false,
                    memsaje: "Contrasena incorrecta"
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
            eliminado: 0
        }});
        if (usuario){
            return usuario;
        }else{
            return null;
        }
    }
}