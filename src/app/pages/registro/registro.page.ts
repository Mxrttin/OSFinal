import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  rut!:string;
  correo: string='';
  telefono!:number;
  password: string = '';
  confirmarPassword: string = '';

  constructor(private router : Router , private alertController: AlertController , private toastController : ToastController, private db : DbService) { }

  ngOnInit() {
  }

  registro() {
    if (this.nombre.trim() === '' || this.apellido.trim() === '' || this.password.trim() === '' || 
        this.confirmarPassword.trim() === '' || this.rut.trim() === '' || this.telefono == 0) {
        
      this.rellenarAlert();
  
    } else if (this.password != this.confirmarPassword) {
  
      this.contraAlert();
  
    } else if (!/[A-Z]/.test(this.password)) {  
      this.mayusculaAlert();
      return;
  
    } else if (!/\d/.test(this.password)) {
      this.numeroPassWordAlert();
      return;
  
    } else if (!this.validarRut(this.rut)) {
      this.rutAlert();
      return;
  
    } else if (!this.validarEmail(this.correo)) {
      this.emailAlert();
  
    } else if (this.telefono.toString().length < 9 || this.telefono.toString().length > 9) {
      this.longitudTelefono();
      return;
  
    } else {
      // Asegurarse de que cualquier sesión previa esté limpia
      // this.authService.logout(); // Llamar al logout antes de registrar el usuario
  
      // Registrar el usuario en la base de datos
      this.db.insertarUsuario(this.nombre, this.apellido, this.rut, this.correo, this.telefono, this.password).then(() => {
        this.registroToast('bottom');
        this.router.navigate(['/login']);
      }).catch(error => {
        console.error('Error al registrar usuario:', error);
        // Aquí puedes agregar un mensaje de error al usuario
      });
    }
  }

  validarRut(rut: string): boolean{
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9K]$/ ;
    return rutRegex.test(rut);
  }

  async rutAlert(){
    const alert = await this.alertController.create({
      header:"Rut Invalido",
      message:"Ingrese un Rut valido en el formato XX.XXX.XXX-K",
      buttons: ['OK'],
    });

    await alert.present();
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async emailAlert() {
    const alert = await this.alertController.create({
      header:"Correo invalido",
      message:"ingrese un Correo Electronico Valido.",
      buttons:['OK'],
    });

    await alert.present();
  }

  async longitudPassWordAlert(){
    const alert = await this.alertController.create({// no me lo esta pezcando 
      header:"La contraseña es demasiado corta",
      message:"La contraseña debe tener al menos 6 caracteres.",
      buttons: ['OK'],
    });
    await alert.present();
  }

  async longitudTelefono(){
    const alert = await this.alertController.create({
      header:"Numero de telefono invalido",
      message:"El numero de telefono debe tener 9 digitos",
      buttons:['OK']
    });
    await alert.present();
  }

  async numeroPassWordAlert(){
    const alert = await this.alertController.create({
      header:"Contraseña Invalida",
      message:"La contraseña debe contener al menos un numero.",
      buttons:['OK'],
    });

    await alert.present();
  }



  async mayusculaAlert() {
  const alert = await this.alertController.create({
    header: "Contrasena invalida",
    message: "La contraseña debe de tener una letra en mayuscula",
    buttons: ['OK'],
  });

  await alert.present();
  }


  async rellenarAlert() {
  const alert = await this.alertController.create({
    header: "Falta rellenar un campo",
    message: "Rellene todos los campos",
    buttons: ['OK'],
  });

  await alert.present();
  }

  async contraAlert() {
  const alert = await this.alertController.create({
    header: "Datos no coinciden",
    message: "Las contraseñas son diferentes",
    buttons: ['OK'],
  });

  await alert.present();
  }

  async registroToast(position:'bottom') {
  const toast = await this.toastController.create({
    message: 'Usuario registrado con exito',
    icon: 'checkmark-outline',
    duration: 2500,
    position: position,
  });

  await toast.present();
  }

}
