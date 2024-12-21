import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CONTACTO')
export class Contacto {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    correo: string

    @Column()
    papel: string

    @Column()
    Eliminado: number
}