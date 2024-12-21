import { InjectRepository } from "@nestjs/typeorm";
import { Contacto } from "./Contacto.entity";
import { Repository } from "typeorm";
import { TokenService } from "../Token/Token.service";
import core from "file-type/core";

export class ContactoService {
    constructor (
        @InjectRepository(Contacto)
        private readonly contactoRepository: Repository<Contacto>,
        private readonly tokenService: TokenService
    ){}

    async obtenerContactos(){
        try {
            const contactos = await this.contactoRepository.find({where: {Eliminado: 0}});
            if (contactos.length==0){
                throw new Error('No hay contacto disponibles');
            }

            return {
                salida: true,
                contactos: contactos
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async ingresarContacto(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }

            const {nombre,correo,papel} = data;

            const noExisteContacto = await this.noExisteContacto(correo);
            if (!(noExisteContacto.salida)){
                return noExisteContacto;
            }

            const contacto = new Contacto();
            contacto.nombre = nombre;
            contacto.correo = correo;
            contacto.papel = papel;
            await this.contactoRepository.save(contacto);

            return {
                salida: true,
                mensaje: "El contacto fue agregado exitosamente"
            }

        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async noExisteContacto(correo){
        try {
            const contacto = await this.contactoRepository.findOne({where: {correo: correo,Eliminado: 0}});
            if (contacto){
                throw new Error('El contacto ingresado ya existe');
            }

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

    async actualizarContacto(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }
            const {idContacto,nombre,correo,papel} = data;
            const contacto = await this.contactoRepository.findOne({where: {id: idContacto, Eliminado: 0}});
            contacto.nombre = nombre;
            contacto.correo = correo;
            contacto.papel = papel;
            await this.contactoRepository.save(contacto);

            return {
                salida: true,
                mensaje: "El contacto se actualizo exitosamente"
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async eliminarContacto(data){
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token;
            }
            const {idContacto} = data;
            const contacto = await this.contactoRepository.findOne({where: {id: idContacto}});
            contacto.Eliminado = 1;
            await this.contactoRepository.save(contacto);

            return {
                salida: true,
                mensaje: "El contacto se elimino exitosamente"
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }
}