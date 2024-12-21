import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('DOCENTE')
export class Docente {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50})
    nombre: string

    @Column({ type: 'varchar', length: 100})
    correo: string

    @Column()
    titulo: number

    @Column({type: 'text'})
    frase: string

    @Column()
    foto: number

    @Column()
    Eliminado: number
}