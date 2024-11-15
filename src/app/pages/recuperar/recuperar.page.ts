import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  recuperarForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dbService: DbService,
    private emailService: EmailService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.recuperarForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  async recuperarPassword() {
    if (this.recuperarForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Procesando solicitud...'
      });
      await loading.present();

      try {
        const correo = this.recuperarForm.get('correo')?.value;
        const usuario = await this.dbService.obtenerUsuarioPorCorreo(correo);

        if (!usuario) {
          await loading.dismiss();
          this.presentAlert('Error', 'No existe una cuenta con este correo electrónico');
          return;
        }

        // Generar nueva contraseña segura
        const nuevaPassword = this.generarPasswordSegura();
        console.log('Nueva contraseña generada:', nuevaPassword);

        // Actualizar contraseña en la base de datos
        await this.dbService.actualizarPassword(correo, nuevaPassword);

        // Verificar que la contraseña se actualizó correctamente
        const actualizacionExitosa = await this.dbService.verificarActualizacionPassword(correo, nuevaPassword);

        if (!actualizacionExitosa) {
          await loading.dismiss();
          this.presentAlert('Error', 'No se pudo actualizar la contraseña en la base de datos');
          return;
        }

        // Enviar correo con la nueva contraseña
        const enviado = await this.emailService.enviarCorreoNuevaPassword(
          correo,
          usuario.nombre,
          nuevaPassword
        );

        await loading.dismiss();

        if (enviado) {
          console.log('Email enviado exitosamente con la nueva contraseña:', nuevaPassword);
          await this.presentAlert('Éxito', 'Se ha enviado un correo con tu nueva contraseña. Por favor, revisa tu bandeja de entrada.');
          this.router.navigate(['/login']);
        } else {
          // Si el correo no se envía, revertir la contraseña
          await this.dbService.actualizarPassword(correo, usuario.clave);
          await this.presentAlert('Error', 'No se pudo enviar el correo. Por favor, intenta nuevamente.');
        }

      } catch (error) {
        console.error('Error en recuperarPassword:', error);
        await loading.dismiss();
        this.presentAlert('Error', 'Ocurrió un error al procesar la solicitud');
      }
    }
  }

  private generarPasswordSegura(): string {
    const longitud = 12;
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const especiales = '@#$%&*';
    
    let password = '';
    
    // Asegurar al menos un carácter de cada tipo
    password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
    password += minusculas[Math.floor(Math.random() * minusculas.length)];
    password += numeros[Math.floor(Math.random() * numeros.length)];
    password += especiales[Math.floor(Math.random() * especiales.length)];
    
    // Caracteres adicionales aleatorios
    const todosCaracteres = mayusculas + minusculas + numeros + especiales;
    for (let i = password.length; i < longitud; i++) {
      password += todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)];
    }
    
    // Mezclar los caracteres
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
