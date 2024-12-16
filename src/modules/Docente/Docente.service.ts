import { InjectRepository } from "@nestjs/typeorm";
import { Docente } from "./Docente.entity"
import { Not, Repository } from "typeorm";
import { FotoService } from "../Foto/Foto.service";
import { TokenService } from "../Token/Token.service";

export class DocenteService {

    constructor(
        @InjectRepository(Docente)
        private readonly docenteRepository: Repository<Docente>,
        private readonly fotoService: FotoService,
        private readonly tokenService: TokenService
    ){}

    async agregarDocente(data){
        const {nombre,correo,titulo,frase,fotoBase64} = data;
        try {
            const token = await this.tokenService.tokenValido(data);
            if (!(token.salida)){
                return token
            }

            if (this.existeCorreo(correo)==null){
                return {
                    salida: false,
                    mensaje: "No se puedo agregar al docente, el correo ya qse encuentra regsitrado"
                }
            }
            const idFoto = await this.fotoService.ingresarFoto(fotoBase64);
            const docente = new Docente();
            docente.nombre = nombre;
            docente.correo = correo;
            docente.titulo = titulo;
            docente.frase = frase;
            docente.foto = idFoto;
            await this.docenteRepository.save(docente);
            return {
                salida: true,
                mensaje: "Se agrego exitosamente al docente"
            }
        } catch (error) {
            return {
                salida: false,
                mensaje: error.messaje
            }
        }
    }

    async existeCorreo(correo){
        console.log(correo);
        const docente = await this.docenteRepository.createQueryBuilder('d')
        .where('d.correo = :correo',{correo}).select([
            'id','correo'
        ]).getRawOne();
        console.log(docente);
        if (docente){
            return docente;
        }else{
            return null;
        }
    }

    async obtenerDocentes(idTitulo){
        try {

            const docentes = await this.docenteRepository.createQueryBuilder('d')
            .addFrom('TITULO','t')
            .where('d.titulo = t.id')
            .andWhere('d.Eliminado = 0')
            .select([
                'd.id As id',
                'd.nombre As nombre',
                'd.correo As correo',
                't.nombre As titulo',
                'd.frase As frase',
                'd.foto As foto'
            ]).getRawMany();
            if (docentes.length==0){
                return {
                    salida: false,
                    mensaje: "No hay docentes disponibles"
                }
            }
            const salidaDocentes = await this.asignarFotos(docentes);
            return {
                salida: true,
                docentes: salidaDocentes
            }

        } catch (error) {   
            return {
                salida: false,
                mensaje: error.message
            };
        }
    }

    async asignarFotos(docentes: Array<any>) {
        const salida = await Promise.all(
            docentes.map(async docente => ({
                id: docente.id,
                nombre: docente.nombre,
                correo: docente.correo,
                titulo: docente.titulo,
                frase: docente.frase,
                foto: await this.fotoService.obtenerFoto(docente.foto),
            }))
        );
        console.log(salida);
        return salida;
    }

}