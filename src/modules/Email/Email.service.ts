import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export class EmailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
				user: 'huaychojaime@gmail.com',
				pass: 'asbu eidd iyos cqjt',
			},
		});
	}

	async enviarEmail(destino, titulo, contenido) {
		
		const mailOptions = {
			from: 'huaychojaime@gmail.com', 
			to: destino,
			subject: titulo,
			text: contenido,
		};

		try {
			const resultado = await this.transporter.sendMail(mailOptions);
			return {
				salida: true,
				mensaje: "El correo se envio exitosamente"
			};
		} catch (error) {
			if (error.response && error.response.includes('550')) {
				return {
					salida: false,
					mensaje: "El correo de destinio no es existe o no es valido"
				};
			}else{
				return {
					salida: false,
					mensaje: error.message
				};
			}
			
		}
	}
}
