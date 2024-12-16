import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ESTUDIANTE')
export class Estudiante {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'varchar', length: 255})
    nombre: string

    @Column()
    nivelAcademico: number

    @Column({type: 'varchar', length: 100})
    correo: string

    @Column()
    tesis: number

    @Column()
    foto: number

    @Column()
    semestre: number
    
    @Column()
    Eliminado: number
}