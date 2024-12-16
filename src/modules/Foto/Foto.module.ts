import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Foto } from "./Foto.entity";
import { FotoService } from "./Foto.service";

@Module({
    imports: [TypeOrmModule.forFeature([Foto])],
    providers: [FotoService],
    exports: [FotoService],
})
export class FotoModule{}