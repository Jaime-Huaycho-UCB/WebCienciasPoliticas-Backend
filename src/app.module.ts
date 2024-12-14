import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 1987,
		username: 'postgres',
		password: '',
		database: 'DB_PortalWeb',
		entities: [__dirname + '/../**/*.entity{.ts,.js}'],
		synchronize: false,
		}),
	],
})
export class AppModule {}
