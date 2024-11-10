import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cambiarpassword',
  templateUrl: './cambiarpassword.page.html',
  styleUrls: ['./cambiarpassword.page.scss'],
})
export class CambiarpasswordPage implements OnInit {
  usuarioRecibido: any;
  password_actual!:any
  password_nueva: string = '';
  confirmarPassword: string = '';

  constructor(private router: Router, private db: DbService, private activedroute: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado']
      }
    })
  }

  async guardar() {
    const existePassword = await this.db.verificarPassword(this.password_actual, this.usuarioRecibido.id_usuario);
  
    if (!existePassword) {
      this.presentAlert('Contraseña no coincide', 'Ingresa tu contraseña');
      return;
    }
  
    if (this.password_nueva.trim() === '' || this.confirmarPassword.trim() === '') {
      this.presentAlert('Campo vacío', 'Los campos no pueden estar vacíos');
      return;
    }
  
    if (this.password_nueva !== this.confirmarPassword) {
      this.presentAlert('Contraseñas no coinciden', 'Asegúrate de que las contraseñas coincidan');
      return;
    }
  
    await this.db.modificarPassword(this.usuarioRecibido.id_usuario, this.password_nueva);
    this.router.navigate(['/cuenta']);
  }

  async presentAlert(titulo:string,msj:string){
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    })
    await alert.present();
  }

}
