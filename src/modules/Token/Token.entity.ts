import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TOKEN')
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario: number;

    @Column({type: 'varchar', length:255 })
    codigo: string;

    @Column({type: 'timestamp'})
    creacion: Date;

    @Column({type: 'timestamp'})
    expiracion: Date;

    @Column()
    eliminado: number;
}