import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('SEMESTRE')
export class Semestre {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cadena: string

    @Column()
    semestre: number

    @Column()
    anio: number

    @Column()
    Eliminado: number
}