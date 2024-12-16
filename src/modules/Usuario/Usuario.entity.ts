import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('USUARIO')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    contrasena: string

    @Column()
    permiso: number

    @Column()
    docente: number

    @Column()
    eliminado: number
}