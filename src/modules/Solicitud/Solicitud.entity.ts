import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('SOLICITUD')
export class Solicitud {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombres: string

    @Column()
    primerApellido: string

    @Column()
    segundoApellido: string

    @Column()
    correo: string

    @Column()
    telefono: string

    @Column()
    ciudad: string

    @Column()
    mensaje: string

    @Column()
    Eliminado: number
}