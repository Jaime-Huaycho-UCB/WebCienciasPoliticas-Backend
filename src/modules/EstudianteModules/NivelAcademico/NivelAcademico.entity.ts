import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('NIVEL_ACADEMICO')
export class NivelAcademico {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 100})
    nombre: string

    @Column()
    Eliminado: number
}