import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TESIS')
export class Tesis {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 50})
    titulo: string

    @Column({type: 'longblob'})
    contenido: Buffer

    @Column({type: 'varchar', length: 50})
    tipo: string

    @Column({type: 'date'})
    fecha_publicacion: Date

    @Column({type: 'text'})
    resumen: string

    @Column()
    Eliminado: number
}