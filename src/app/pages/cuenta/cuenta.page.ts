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

  constructor(private auth: AuthService, private db:DbService, private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.guardarUsuarioEnArreglo();
  }

  async guardarUsuarioEnArreglo() {
    try {
      // Obtiene el ID del usuario almacenado en NativeStorage
      const userId = await this.nativeStorage.getItem('userId');
      
      if (userId) {
        // Busca en la base de datos el usuario con ese ID
        this.db.obtenerUsuarioPorId(userId).then(usuario => {
          if (usuario) {
            this.arregloUsuario = [usuario];
          } else {
            console.warn('Usuario no encontrado en la base de datos.');
          }
        }).catch(error => {
          console.error('Error al buscar el usuario:', error);
        });
      } else {
        console.warn('No hay ID de usuario almacenado en NativeStorage.');
      }
    } catch (error) {
      console.error('Error al obtener el ID de usuario de NativeStorage:', error);
    }
  }

  agregarDireccion(usuario: any){
    let navigationExtras : NavigationExtras = {
      state:{
        usuarioEnviado:usuario
      }
    }
    this.router.navigate(['/agregardireccion'],navigationExtras)
  }

  modificarDatos(usuario: any){
    let navigationExtras : NavigationExtras = {
      state:{
        usuarioEnviado:usuario
      }
    }
    this.router.navigate(['/modificarperfil'],navigationExtras)
  }

}
