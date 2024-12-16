import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Docente } from "./Docente.entity";
import { DocenteService } from "./Docente.service";
import { DocenteController } from "./Docente.controller";
import { FotoModule } from "../Foto/Foto.module";
import { TokenModule } from "../Token/Token.module";
import { TituloModule } from "../Titulo/Titulo.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Docente]),
        TokenModule,
        FotoModule,
        TituloModule
    ],
    providers: [DocenteService],
    exports: [DocenteService],
    controllers: [DocenteController]
})
export class DocenteModule{}