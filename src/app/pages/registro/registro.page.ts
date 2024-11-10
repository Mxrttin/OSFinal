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

  async registro() {
    // Validaciones de campos obligatorios
    if (
      this.nombre.trim() === '' || 
      this.apellido.trim() === '' || 
      this.password.trim() === '' || 
      this.confirmarPassword.trim() === '' || 
      this.rut.trim() === '' || 
      this.telefono === 0
    ) {
      this.rellenarAlert();
      return;
    }
  
    // Validación de coincidencia de contraseñas
    if (this.password !== this.confirmarPassword) {
      this.contraAlert();
      return;
    }
  
    // Validación de mayúscula en contraseña
    if (!/[A-Z]/.test(this.password)) {
      this.mayusculaAlert();
      return;
    }
  
    // Validación de número en contraseña
    if (!/\d/.test(this.password)) {
      this.numeroPassWordAlert();
      return;
    }
  
    // Validación de RUT
    if (!this.validarRut(this.rut)) {
      this.rutAlert();
      return;
    }
  
    // Validación de correo electrónico
    if (!this.validarEmail(this.correo)) {
      this.emailAlert();
      return;
    }
  
    // Validación de longitud del teléfono
    if (this.telefono.toString().length !== 9) {
      this.longitudTelefono();
      return;
    }
  
    // Verificar si el correo ya existe
    const existeCorreo = await this.db.verificarCorreo(this.correo, 0);
    if (existeCorreo) {
      this.presentAlert('Correo existente', 'Ya existe un usuario registrado con ese correo.');
      return;
    }
  
    // Verificar si el teléfono ya existe
    const existeTelefono = await this.db.verificarTelefono(this.telefono, 0);
    if (existeTelefono) {
      this.presentAlert('Teléfono existente', 'Ya existe un usuario registrado con ese número de teléfono.');
      return;
    }
  
    // Verificar si el RUT ya existe
    const existeRut = await this.db.verificarRut(this.rut, 0);
    if (existeRut) {
      this.presentAlert('Rut existente', 'Ya existe un usuario registrado con ese Rut.');
      return;
    }
  
    // Inserción en la base de datos y navegación
    try {
      await this.db.insertarUsuario(
        this.nombre, 
        this.apellido, 
        this.rut, 
        this.correo, 
        this.telefono, 
        this.password
      );
      this.registroToast('bottom');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
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

  async presentAlert(titulo:string,msj:string){
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    })
    await alert.present();
  }

}
