import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./Usuario.entity";
import { DocenteModule } from "../Docente/Docente.module";
import { TokenModule } from "../Token/Token.module";
import { Module } from "@nestjs/common";
import { UsuarioService } from "./Usuario.service";
import { UsuarioController } from "./Usuario.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        TokenModule,
        DocenteModule
    ],
    providers: [UsuarioService],
    controllers: [UsuarioController],
})
export class UsuarioModule{}