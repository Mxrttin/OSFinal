import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  arregloUsuario: any;
  cargando: boolean = true;

  constructor(
    private auth: AuthService,
    private db: DbService,
    private router: Router,
    private nativeStorage: NativeStorage
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    this.cargando = true;
    this.arregloUsuario = [];  // Reinicia el arreglo para evitar mostrar datos antiguos
    try {
      const userId = await this.nativeStorage.getItem('userId');
      if (userId) {
        const usuario = await this.db.obtenerUsuarioPorId(userId);
        if (usuario) {
          this.arregloUsuario = [usuario];
        } else {
          console.warn('Usuario no encontrado en la base de datos.');
        }
      } else {
        console.warn('No hay ID de usuario almacenado en NativeStorage.');
      }
    } catch (error) {
      console.error('Error al obtener el ID de usuario de NativeStorage:', error);
    } finally {
      this.cargando = false;
    }
  }

  agregarDireccion(usuario: any) {
    let navigationExtras: NavigationExtras = {
      state: { usuarioEnviado: usuario },
    };
    this.router.navigate(['/agregardireccion'], navigationExtras);
  }

  modificarDatos(usuario: any) {
    let navigationExtras: NavigationExtras = {
      state: { usuarioEnviado: usuario },
    };
    this.router.navigate(['/modificarperfil'], navigationExtras);
  }

  modificarPassword(usuario: any) {
    let navigationExtras: NavigationExtras = {
      state: { usuarioEnviado: usuario },
    };
    this.router.navigate(['/cambiarpassword'], navigationExtras);
  }

  irPedidos(usuario: any){
    let navigationExtras: NavigationExtras = {
      state: { usuarioEnviado: usuario },
    };
    this.router.navigate(['/pedidosusuarios'], navigationExtras);
  }
}