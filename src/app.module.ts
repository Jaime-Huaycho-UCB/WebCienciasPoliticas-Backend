import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './modules/Foto/Foto.module';
import { TokenModule } from './modules/Token/Token.module';
import { DocenteModule } from './modules/DocenteModules/Docente/Docente.module';
import { Token } from './modules/Token/Token.entity';
import { Docente } from './modules/DocenteModules/Docente/Docente.entity';
import { Foto } from './modules/Foto/Foto.entity';
import { Usuario } from './modules/Usuario/Usuario.entity';
import { UsuarioModule } from './modules/Usuario/Usuario.module';
import { TituloModule } from './modules/DocenteModules/Titulo/Titulo.module';
import { Titulo } from './modules/DocenteModules/Titulo/Titulo.entity';
import { TesisModule } from './modules/EstudianteModules/Tesis/Tesis.module';
import { Tesis } from './modules/EstudianteModules/Tesis/Tesis.entity';
import { Estudiante } from './modules/EstudianteModules/Estudiante/Estudiante.entity';
import { EstudianteModule } from './modules/EstudianteModules/Estudiante/Estudiante.module';
import { NivelAcademico } from './modules/EstudianteModules/NivelAcademico/NivelAcademico.entity';
import { Semestre } from './modules/EstudianteModules/Semestre/Semestre.entity';
import { NivelAcademicoModule } from './modules/EstudianteModules/NivelAcademico/NivelAcademico.module';
import { SemestreModule } from './modules/EstudianteModules/Semestre/Semestre.module';
import { Solicitud } from './modules/Solicitud/Solicitud.entity';
import { SolicitudModule } from './modules/Solicitud/Solicitud.module';
import { EmailService } from './modules/Email/email.service';
import { ContactoModule } from './modules/Contacto/Contacto.module';
import { Contacto } from './modules/Contacto/Contacto.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '',
		database: 'DB_CienciasPoliticas',
		entities: [
			Token,
			Docente,
			Foto,
			Usuario,
			Titulo,
			Tesis,
			Estudiante,
			NivelAcademico,
			Semestre,
			Solicitud,
			Contacto
		],
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
		NivelAcademicoModule,
		SemestreModule,
		SolicitudModule,
		EmailService,
		ContactoModule
	],
})
export class AppModule {}
