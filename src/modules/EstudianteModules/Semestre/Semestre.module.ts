import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Semestre } from "./Semestre.entity";
import { SemestreService } from "./Semestre.service";
import { SemestreController } from "./Semestre.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Semestre]),        
    ],
    providers: [SemestreService],
    controllers: [SemestreController],
    exports: [SemestreService],
})
export class SemestreModule{}