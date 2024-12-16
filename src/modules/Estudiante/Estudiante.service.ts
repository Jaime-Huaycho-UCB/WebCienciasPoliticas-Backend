import { InjectRepository } from "@nestjs/typeorm";
import { Estudiante } from "./Estudiante.entity";
import { Repository } from "typeorm";
import { Foto } from "../Foto/Foto.entity";
import { FotoService } from "../Foto/Foto.service";

export class EstudianteService {
    constructor (
        @InjectRepository(Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
        private readonly fotoService: FotoService
    ){}

    async obtenerEstudiantePorTesis(idTesis){

        if (idTesis==null){
            return null;
        }

        const estudiante = await this.estudianteRepository.findOne({where: {
            tesis: idTesis,
            Eliminado: 0
        }});
        if (!(estudiante)){
            return null;
        }

        return {
            id: estudiante.id,
            nombre: estudiante.nombre,
            correo: estudiante.correo,
            nivelAcademico: estudiante.nivelAcademico,
            foto: await this.fotoService.obtenerFoto(estudiante.foto)
        }
    }

    async agregarTesis(idEstudiante,idTesis){
        try {
            const estudiante = await this.estudianteRepository.findOne({where: {id: idEstudiante}});
            estudiante.tesis = idTesis;
            await this.estudianteRepository.save(estudiante);
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
}