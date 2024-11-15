import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly SERVICE_ID = 'service_6xtlvjg';
  private readonly TEMPLATE_ID = 'template_b0tspcv';
  private readonly PUBLIC_KEY = 'pZ9eQmL4tBF6vEB0d';

  constructor() {
    emailjs.init(this.PUBLIC_KEY);
  }

  async enviarCorreoNuevaPassword(correoDestino: string, nombreUsuario: string, nuevaPassword: string): Promise<boolean> {
    try {
      const templateParams = {
        to_email: correoDestino,
        to_name: nombreUsuario,
        temp_password: nuevaPassword,
        message: `Tu nueva contraseña es: ${nuevaPassword}`,
        from_name: 'Oculto Studio',
        reply_to: 'noreply@ocultostudio.com'
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams
      );

      console.log('Email enviado a:', correoDestino);
      return response.status === 200;
    } catch (error) {
      console.error('Error al enviar email:', error);
      return false;
    }
  }
}
