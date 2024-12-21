import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./Usuario.entity";
import { DocenteModule } from "../DocenteModules/Docente/Docente.module";
import { TokenModule } from "../Token/Token.module";
import { forwardRef, Module } from "@nestjs/common";
import { UsuarioService } from "./Usuario.service";
import { UsuarioController } from "./Usuario.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        TokenModule,
        forwardRef(()=> DocenteModule)
    ],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService]
})
export class UsuarioModule{}