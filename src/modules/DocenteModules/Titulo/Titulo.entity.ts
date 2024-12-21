import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TITULO')
export class Titulo {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 70})
    nombre: string

    @Column()
    Eliminado: number

}