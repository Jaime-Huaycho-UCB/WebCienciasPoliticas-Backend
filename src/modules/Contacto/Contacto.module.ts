import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contacto } from "./Contacto.entity";
import { ContactoService } from "./Contacto.service";
import { ContactoController } from "./Contacto.controller";
import { TokenModule } from "../Token/Token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Contacto]),
        TokenModule
    ],
    providers: [ContactoService],
    controllers: [ContactoController]
})
export class ContactoModule{}