import { InjectRepository } from "@nestjs/typeorm";
import { Foto } from "./Foto.entity";
import { Repository } from "typeorm";
import { fromBuffer } from "file-type";


export class FotoService {

    constructor (
        @InjectRepository(Foto)
        private readonly fotoRepository: Repository<Foto>
    ){}

    async ingresarFoto(foto){
        try {
            if (foto==null){
                return null
            }    
            const contenido = Buffer.from(foto,'base64');
            const tipo = await fromBuffer(contenido);
            const fotoNuevo = new Foto();
            fotoNuevo.contenido = contenido;
            fotoNuevo.tipo = tipo.mime;
            const fotoGuardado = await this.fotoRepository.save(fotoNuevo);
            return fotoGuardado.id
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async obtenerFoto(idFoto){
        try {
            if (idFoto==null){
                return null;
            }

            const foto = await this.fotoRepository.findOne(
                {where: {
                    id: idFoto,
                    Eliminado: 0
                }}
            );

            if (!foto){
                return null;
            }

            return await `data:${foto.tipo};base64,${foto.contenido.toString('base64')}`;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async eliminarFoto(idFoto){
        try {
            if (idFoto==null){
                return true;
            }
            const foto = await this.fotoRepository.findOne({where: {id: idFoto}});
            foto.Eliminado=1;
            await this.fotoRepository.save(foto);
            return true;
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async actualizarFoto(idFoto,contenido){
        try {
            const nuevoContenido = Buffer.from(contenido,'base64');
            const foto = (idFoto==null) ? new Foto() : await this.fotoRepository.findOne({where: {id: idFoto}});
            foto.contenido=nuevoContenido;
            const fotoGuardada = await this.fotoRepository.save(foto);
            return fotoGuardada.id;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}