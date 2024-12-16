import { InjectRepository } from "@nestjs/typeorm";
import { Titulo } from "./Titulo.entity";
import { Repository } from "typeorm";

export class TituloService{
    constructor(
        @InjectRepository(Titulo)
        private readonly tituloRepository: Repository<Titulo>
    ){}

    async obtenerTitulos(){
        try {
            const titulos = await this.tituloRepository.find({where: {Eliminado: 0}});
            if (titulos.length>0){
                return {
                    salida: true,
                    titulos: titulos
                };
            }else{
                return {
                    salida: false,
                    mensaje: "No hay titulos disponibles"
                }
            }
        } catch (error) {
            console.log(error);
            return {
                salida: false,
                mensaje: error.message
            }
        }
    }
}