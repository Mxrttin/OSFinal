import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.page.html',
  styleUrls: ['./modificarperfil.page.scss'],
})
export class ModificarperfilPage implements OnInit {
  usuarioRecibido: any;

  constructor(private router: Router, private db: DbService, private activedroute: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado']
      }
    })
  }

  guardar(){
    this.db.modificarDatos(this.usuarioRecibido.id_usuario,this.usuarioRecibido.nombre,this.usuarioRecibido.apellido,this.usuarioRecibido.rut,this.usuarioRecibido.correo,this.usuarioRecibido.telefono,this.usuarioRecibido.foto)
    this.router.navigate(['/cuenta'])
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.usuarioRecibido.foto = image.webPath;
  };

}
