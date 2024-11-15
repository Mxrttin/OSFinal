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
  password_actual: string = "";
  password_nueva: string = "";
  confirmar_password: string = "";
  usuarioRecibido: any;

  constructor(
    private router: Router,
    private db: DbService,
    private alertController: AlertController,
    private activedroute: ActivatedRoute
  ) { }

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
      this.presentAlert('Contraseña no coincide', 'Ingresa tu contraseña actual');
      return;
    }
  
    if (this.password_nueva.trim() === '' || this.confirmar_password.trim() === '') {
      this.presentAlert('Campo vacío', 'Los campos no pueden estar vacíos');
      return;
    }
  
    if (this.password_nueva !== this.confirmar_password) {
      this.presentAlert('Contraseñas no coinciden', 'Asegúrate de que las contraseñas coincidan');
      return;
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(this.password_nueva)) {
      this.presentAlert(
        'Contraseña no segura',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
      );
      return;
    }
  
    await this.db.modificarPassword(this.usuarioRecibido.id_usuario, this.password_nueva);
    this.presentAlert('Exito','Contraseña modificada con exito')
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
