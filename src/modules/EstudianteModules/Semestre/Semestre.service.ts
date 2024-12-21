import { InjectRepository } from "@nestjs/typeorm";
import { Semestre } from "./Semestre.entity";
import { Repository } from "typeorm";

export class SemestreService{
    constructor(
        @InjectRepository(Semestre)
        private readonly semestreRepository: Repository<Semestre>
    ){}

    async obtenerSemestres(){
        try {
            const semestres = await this.semestreRepository
            .createQueryBuilder('s')
            .where('s.Eliminado = 0')
            .orderBy('s.anio','DESC')
            .getMany();

            if (semestres.length==0){
                return {
                    salida: false,
                    mensaje: "No hay semsetres disponibles"
                }
            }

            return {
                saloida: true,
                semestres: semestres
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async obtenerSemestre(num,anio){
        try {
            const buscar = await this.semestreRepository.findOne({
                where: {
                    semestre: num,
                    anio: anio,
                    Eliminado: 0
                }
            });

            if (buscar){
                return {
                    salida: true,
                    idSemestre: buscar.id
                }
            }

            const semestre = new Semestre();
            semestre.cadena = `${num}-${anio}`;
            semestre.semestre = num;
            semestre.anio = anio;
            const semestreGuardado = await this.semestreRepository.save(semestre);
            return {
                salida: true,
                idSemestre: semestreGuardado.id
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }
}