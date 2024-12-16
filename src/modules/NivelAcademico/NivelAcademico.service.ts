import { InjectRepository } from "@nestjs/typeorm";
import { NivelAcademico } from "./NivelAcademico.entity";
import { Repository } from "typeorm";

export class NivelAcademicoService {
    constructor (
        @InjectRepository(NivelAcademico)
        private readonly nivelAcademicoRepository: Repository<NivelAcademico>
    ){}
}