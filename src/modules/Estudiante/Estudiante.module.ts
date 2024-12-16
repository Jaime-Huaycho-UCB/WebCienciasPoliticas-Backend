import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estudiante } from "./Estudiante.entity";
import { EstudianteService } from "./Estudiante.service";
import { EstudianteController } from "./Estudiante.controller";
import { FotoModule } from "../Foto/Foto.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Estudiante]),
        FotoModule
    ],
    providers: [EstudianteService],
    controllers: [EstudianteController],
    exports: [EstudianteService],
})
export class EstudianteModule{}