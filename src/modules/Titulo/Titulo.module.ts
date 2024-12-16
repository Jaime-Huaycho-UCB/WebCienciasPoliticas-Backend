import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Titulo } from "./Titulo.entity";
import { TituloService } from "./Titulo.service";
import { TituloController } from "./Titulo.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([Titulo])
    ],
    providers: [TituloService],
    exports: [TituloService],
    controllers: [TituloController]
})
export class TituloModule{}