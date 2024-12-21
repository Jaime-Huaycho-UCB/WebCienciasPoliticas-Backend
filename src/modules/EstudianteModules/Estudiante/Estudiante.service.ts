import { InjectRepository } from "@nestjs/typeorm";
import { Estudiante } from "./Estudiante.entity";
import { Repository } from "typeorm";
import { FotoService } from "../../Foto/Foto.service";

export class EstudianteService {
    constructor (
        @InjectRepository(Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
        private readonly fotoService: FotoService
    ){}

    async obtenerEstudiantes(idSemestre){
        try {

            let estudiantes = await this.obtenerQueryEstudiantes(idSemestre);
            if (estudiantes.length==0){
                throw new Error('NO hay estudiantes registrados');
            }
            for (let i=0;i<estudiantes.length;i++){
                estudiantes[i].foto = await this.fotoService.obtenerFoto(estudiantes[i].foto);
            }

            return {
                salida: true,
                estudiantes: estudiantes
            }

        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    private async obtenerQueryEstudiantes(idSemestre){
        if (idSemestre!=0){
            let estudiantes = await this.estudianteRepository
            .createQueryBuilder('e')
            .addFrom('NIVEL_ACADEMICO','n')
            .addFrom('SEMESTRE','s')
            .where('e.Eliminado = 0')
            .andWhere('e.semestre = :idSemestre',{idSemestre})
            .andWhere('e.nivelAcademico = n.id')
            .andWhere('s.id = e.semestre')
            .select([
                'e.id As id',
                'e.nombre As nombre',
                'n.nombre As nivelAcademico',
                'e.correo As correo',
                'e.foto As foto',
                's.cadena As semestre'
            ])
            .getRawMany();
            return estudiantes;
        }else{
            let estudiantes = await this.estudianteRepository
            .createQueryBuilder('e')
            .addFrom('NIVEL_ACADEMICO','n')
            .addFrom('SEMESTRE','s')
            .where('e.Eliminado = 0')
            .andWhere('e.nivelAcademico = n.id')
            .andWhere('s.id = e.semestre')
            .select([
                'e.id As id',
                'e.nombre As nombre',
                'n.nombre As nivelAcademico',
                'e.correo As correo',
                'e.foto As foto',
                's.cadena As semestre'
            ])
            .getRawMany();
            return estudiantes;
        }
    }

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