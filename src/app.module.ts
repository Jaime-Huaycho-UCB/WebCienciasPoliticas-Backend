import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './modules/Foto/Foto.module';
import { TokenModule } from './modules/Token/Token.module';
import { DocenteModule } from './modules/Docente/Docente.module';
import { Token } from './modules/Token/Token.entity';
import { Docente } from './modules/Docente/Docente.entity';
import { Foto } from './modules/Foto/Foto.entity';
import { Usuario } from './modules/Usuario/Usuario.entity';
import { UsuarioModule } from './modules/Usuario/Usuario.module';
import { TituloModule } from './modules/Titulo/Titulo.module';
import { Titulo } from './modules/Titulo/Titulo.entity';
import { TesisModule } from './modules/Tesis/Tesis.module';
import { Tesis } from './modules/Tesis/Tesis.entity';
import { Estudiante } from './modules/Estudiante/Estudiante.entity';
import { EstudianteModule } from './modules/Estudiante/Estudiante.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '',
		database: 'DB_CienciasPoliticas',
		entities: [Token,Docente,Foto,Usuario,Titulo,Tesis,Estudiante],
		synchronize: false,
		logging: true,
		}),
		FotoModule,
		TokenModule,
		DocenteModule,
		UsuarioModule,
		TituloModule,
		TesisModule,
		EstudianteModule,
	],
})
export class AppModule {}
