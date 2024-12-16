import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tesis } from "./Tesis.entity";
import { TesisService } from "./Tesis.service";
import { TesisController } from "./Tesis.controller";
import { EstudianteModule } from "../Estudiante/Estudiante.module";
import { TokenModule } from "../Token/Token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Tesis]),
        EstudianteModule,
        TokenModule
    ],
    providers: [TesisService],
    controllers: [TesisController],
    exports: [TesisService],
})
export class TesisModule{}