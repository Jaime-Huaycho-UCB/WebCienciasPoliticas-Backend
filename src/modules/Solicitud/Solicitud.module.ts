import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Solicitud } from "./Solicitud.entity";
import { SolicitudService } from "./Solicitud.service";
import { SolicitudController } from "./Solicitud.controller";
import { TokenModule } from "../Token/Token.module";
import { EmailModule } from "../Email/Email.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Solicitud]),
        TokenModule,
        EmailModule
    ],
    providers: [SolicitudService],
    controllers: [SolicitudController],
    exports: [SolicitudService]
})
export class SolicitudModule{}