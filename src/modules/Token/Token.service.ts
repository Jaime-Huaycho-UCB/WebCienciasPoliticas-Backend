import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./Token.entity";
import { Repository } from "typeorm";
import * as crypto from 'crypto';


export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>
    ) {}
    
    async crearToken(idUsuario){
        const tiempoActual = new Date();

        try {
            const codigo = await this.generarToken();

            const creacion = this.formatearFecha(tiempoActual);
            tiempoActual.setMinutes(tiempoActual.getMinutes() + 2);
            const expiracion = this.formatearFecha(tiempoActual);

            const respuesta = await this.tokenRepository.update({
                    usuario: idUsuario
                },{
                    codigo: codigo,
                    creacion,
                    expiracion,
                },
            );

            if (respuesta.affected > 0) {
                return {
                    salida: true,
                    token: codigo,
                };
            } else {
                return {
                    salida: false,
                    mensaje: 'No se actualizó el token',
                };
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message,
            };
        }
    }
    async generarToken() {
        return crypto.randomBytes(16).toString('hex');
    }
    async tokenValido(data){
        const {idUsuario,token} =data;
        const objetoToken = await this.obtenerToken(idUsuario);
        if (objetoToken && objetoToken.codigo == token) {
            const expiracionToken = new Date(objetoToken.expiracion);
            const tiempoActual = new Date();
            if (expiracionToken >= tiempoActual) {
                return {
                    salida: await this.extenderTiempoExpiracion(objetoToken.id),
                };
            } else {
                return {
                    salida: false,
                    mensaje: "TKIN",
                };
            }
        } else {
            return {
                salida: false,
                mensaje: "TKIN"
            };
        }
    }
    
    async obtenerToken(idUsuario: number){
        return await this.tokenRepository.findOne({ where: { usuario: idUsuario, Eliminado: 0 } });
    }

    async eliminarToken(id){
        try {
            await this.tokenRepository.update({ usuario: id }, { Eliminado: 1 });
            return {
                salida: true
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }
    
    async extenderTiempoExpiracion(idToken) {
        try {
            const tiempoActual = new Date();
            tiempoActual.setMinutes(tiempoActual.getMinutes() + 2);
            await this.tokenRepository.update({id: idToken}, { expiracion: this.formatearFecha(tiempoActual) });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async inicializarToken(idUsuario){
        try {
            const token = new Token();
            token.usuario = idUsuario;
            token.codigo=null;
            token.creacion=null;
            token.expiracion = null;
            await this.tokenRepository.save(token);
            return {
                salida: true
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    private formatearFecha(fecha: Date): string {
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const segundos = String(fecha.getSeconds()).padStart(2, '0');
        return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }
}