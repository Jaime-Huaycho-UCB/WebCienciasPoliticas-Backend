import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NivelAcademico } from "./NivelAcademico.entity";
import { NivelAcademicoService } from "./NivelAcademico.service";
import { NivelAcademicoController } from "./NivelAcademico.controller";

@Module({
    imports: [TypeOrmModule.forFeature([NivelAcademico])],
    providers: [NivelAcademicoService],
    controllers: [NivelAcademicoController],
    exports: [NivelAcademicoService],
})
export class NivelAcademicoModule{}