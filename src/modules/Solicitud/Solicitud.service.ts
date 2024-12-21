import { InjectRepository } from "@nestjs/typeorm";
import { Solicitud } from "./Solicitud.entity";
import { Repository } from "typeorm";
import { TokenService } from "../Token/Token.service";
import { EmailService } from "../Email/email.service";

export class SolicitudService {
    constructor (
        @InjectRepository(Solicitud)
        private readonly solicitudRepository: Repository<Solicitud>,
        private readonly tokenService: TokenService,
        private readonly emailService: EmailService
    ){}

    async enviarSolicitud(data){
        const {nombres,primerApellido,segundoApellido,correo,telefono,ciudad,mensaje} = data;
        try {
            const solicitud = new Solicitud();
            solicitud.nombres = nombres;
            solicitud.primerApellido = primerApellido;
            solicitud.segundoApellido = segundoApellido;
            solicitud.correo = correo;
            solicitud.telefono = telefono;
            solicitud.ciudad = ciudad;
            solicitud.mensaje = mensaje;
            await this.solicitudRepository.save(solicitud);
            return {
                salida: true,
                mensaje: "Se encio la solicitud exitosamente"
            };
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            };
        }
    }

    async obtenerSolicitudes(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }

            const solicitudes = await this.solicitudRepository.find({where: {Eliminado: 0}});
            if (solicitudes.length==0){
                throw new Error("No hay solicitudes pendientes");
            }

            return {
                salida: true,
                solicitudes: solicitudes
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async eliminarSolicitud(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }

            const {idSolicitud} = data;

            const solicitud = await this.solicitudRepository.findOne({where: {id: idSolicitud}});
            solicitud.Eliminado=1;
            await this.solicitudRepository.save(solicitud);

            return {
                salida: true,
                mensaje: "La solicitud se elimino exitosamente",
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async responderSolicitud(data){
        try {
            // const token = await this.tokenService.tokenValido(data);
            // if (!(token.salida)){
            //     return token;
            // }

            const {destino, titulo, contenido} = data;
            const resultado = await this.emailService.enviarEmail(destino,titulo,contenido);
            if (!(resultado.salida)){
                return resultado;
            }

            return {
                salida: true,
                mensaje: `Se envio la respuesta exitosamente al correo ${destino}`
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }
}