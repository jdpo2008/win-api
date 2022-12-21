/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationApiService {
  private readonly logger = new Logger(NotificationApiService.name);

  constructor(private mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendUserNotification(data: any) {
    this.logger.log('User Created..', data);
  }

  sendPostulacionNotification(data: any) {
    const request: NotificationDto = {
      to: data.email,
      from: 'soporte_win@cambiateawin.pe',
      subject: 'Postulacion Solicitada',
      html: `
        <p>Estimado ${data.nombres} ${data.apellidos},</p>
        <p>Es un grato placer saludarlo e informarle que su postulacion ha sido recibida con exito que pronto sera contactado</p>

        <p>Por favor no responder a este correo</p>

        <p>Saludos</p>

        <p>seleccion_win@cambiateawin.pe</p>
      `,
    };

    this.logger.log('Postulacion created..', data);

    this.mailerService
      .sendMail(request)
      .then(() => {
        console.log('Successfull...');
      })
      .catch((error) => {
        console.log('Error.. ', error);
      });
  }

  sendInformacionNotification(data: any) {
    this.logger.log('Informacion Created..', data);
  }
}
