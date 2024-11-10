import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { DbService } from 'src/app/services/db.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  arregloUsuarios: any;
  loginUser: string = '';
  passwordUser: string = '';

  constructor(private router: Router, private alertController: AlertController, private db: DbService, private nativestorage: NativeStorage, private auth: AuthService, private carritoService: CarritoService) { }

  async ngOnInit() {
    // Verificar si hay sesión activa al cargar la página
    const sesionActiva = await this.auth.verificarSesion();
    if (sesionActiva) {
      // Ya se redirigió en verificarSesion()
      return;
    }
  }

  async onLogin() {
    try {
      const usuario = await this.db.validarUsuario(this.loginUser, this.passwordUser);
      if (usuario) {
        const userId = usuario.id_usuario.toString();
        await this.nativestorage.setItem('userId', userId);
        await this.nativestorage.setItem('rolId', usuario.rol.toString());
        
        // Cargar el carrito del usuario
        await this.carritoService.cargarCarritoUsuario(userId);
        
        if (usuario.rol === 1) {
          await this.router.navigate(['/adminprincipal']);
        } else {
          await this.router.navigate(['/home']);
        }
        this.limpiarCampos();
      } else {
        await this.mostrarAlerta('Login Fallido', 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en login:', error);
      await this.mostrarAlerta('Error', 'Ocurrió un error al intentar iniciar sesión.');
    }
  }

  private limpiarCampos() {
    this.loginUser = '';
    this.passwordUser = '';
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
