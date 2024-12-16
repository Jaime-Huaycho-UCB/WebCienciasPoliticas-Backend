import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./Token.entity";
import { Repository } from "typeorm";
import * as crypto from 'crypto';


export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
    ) {}
    
    async crearToken(idUsuario){
        const tiempoActual = new Date();

        try {
            const codigo = await this.generarToken();

            const creacion = tiempoActual.toISOString();
            tiempoActual.setMinutes(tiempoActual.getMinutes() + 10);
            const expiracion = tiempoActual.toISOString();

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
        if (objetoToken && objetoToken.codigo === token) {
            const expiracionToken = new Date(objetoToken.expiracion);
            const tiempoActual = new Date();
            if (expiracionToken >= tiempoActual) {
                return {
                    salida: this.extenderTiempoExpiracion(objetoToken.id)
                }
            } else {
                return {
                    salida: false,
                    mensaje: "TKIN"
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
        return await this.tokenRepository.findOne({ where: { usuario: idUsuario, eliminado: 0 } });
    }

    async eliminarToken(id: number){
        await this.tokenRepository.update({ usuario: id }, { eliminado: 1 });
    }
    
    async extenderTiempoExpiracion(idToken){
        try {
            const tiempoActual = new Date();
            tiempoActual.setMinutes(tiempoActual.getMinutes() + 10); 
            await this.tokenRepository.update(idToken, { expiracion: tiempoActual.toDateString() });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}