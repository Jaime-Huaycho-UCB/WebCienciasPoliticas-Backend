import { Module } from "@nestjs/common";
import { Token } from "./Token.entity";
import { TokenService } from "./Token.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Token])],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule{}