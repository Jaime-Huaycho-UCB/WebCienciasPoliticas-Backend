import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FOTO')
export class Foto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'longblob' })
    contenido: Buffer

    @Column({type: 'varchar', length: 50})
    tipo: string

    @Column()
    Eliminado: number
}