import { InjectRepository } from "@nestjs/typeorm";
import { Tesis } from "./Tesis.entity";
import { Repository } from "typeorm";
import { EstudianteService } from "../Estudiante/Estudiante.service";
import { TokenService } from "../../Token/Token.service";
import { fromBuffer } from "file-type";

export class TesisService{
    constructor (
        @InjectRepository(Tesis)
        private readonly tesisRepository: Repository<Tesis>,
        private readonly estudianteService: EstudianteService,
        private readonly tokenService: TokenService
    ){}

    async obtenerTesises(){
        try {
            const tesises = await this.tesisRepository.find({where: {Eliminado: 0}});
            if (tesises.length > 0) {
                const salida = [];
        
                for (const tesis of tesises) {
                    const salidaTesis = {
                        id: tesis.id,
                        titulo: tesis.titulo,
                        fechaPublicacion: tesis.fecha_publicacion,
                        resumen: tesis.resumen,
                    };
            
                    const salidaEstudiante = await this.estudianteService.obtenerEstudiantePorTesis(tesis.id);
            
                    salida.push({
                        tesis: salidaTesis,
                        estudiante: salidaEstudiante,
                    });
                }
        
                return {
                    salida: true,
                    tesises: salida,
                };
            } else {
                return {
                    salida: false,
                    mensaje: 'No hay tesis disponibles',
                };
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async obtenerContenido(idTesis){
        try {
            const tesis = await this.tesisRepository.findOne({where: {id: idTesis}});
            const contenido = await `data:${tesis.tipo};base64,${tesis.contenido.toString('base64')}`;
            return {
                salida: true,
                contenido: contenido
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }

    async ingresarTesis(data){
        try {
            console.log(data);
            const {idEstudiante, titulo, fechaPublicacion, tesis, resumen } = data;
        
            const tokenValido = await this.tokenService.tokenValido(data);
            if (!tokenValido.salida) {
                return tokenValido;
            }
        
            if (tesis==null) {
                return {
                    salida: false,
                    mensaje: 'La tesis tiene que tener contenido',
                };
            }

            
            const contenido = await Buffer.from(tesis,'base64');
            const tipo = await fromBuffer(contenido);
        
            const nuevaTesis = new Tesis();
            nuevaTesis.titulo = titulo;
            nuevaTesis.contenido = contenido;
            nuevaTesis.tipo = tipo.mime;
            nuevaTesis.fecha_publicacion = fechaPublicacion;
            nuevaTesis.resumen = resumen;


            const tesisGuardada = await this.tesisRepository.save(nuevaTesis);
        
            if (idEstudiante!=null) {
                const enlaceExitoso = await this.estudianteService.agregarTesis(idEstudiante, tesisGuardada.id); // Implementar
                if (!(enlaceExitoso.salida)) {
                    return enlaceExitoso;
                }
            }
        
            return {
                salida: true,
                mensaje: 'Se ingresó la tesis exitosamente',
            };
        } catch (error) {
            return {
                salida: false,
                mensaje: error.message,
            };
        }
    }
}