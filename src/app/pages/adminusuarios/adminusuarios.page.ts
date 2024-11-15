import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-adminusuarios',
  templateUrl: './adminusuarios.page.html',
  styleUrls: ['./adminusuarios.page.scss'],
})
export class AdminusuariosPage implements OnInit {

  arregloUsuario!:any;

  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchUsuario().subscribe(res=>{
          this.arregloUsuario = res
        })
      }
    })
  }

  visualizarUsuario(usuario: any){
    let navigationExtras: NavigationExtras = {

      state:{
        usuarioEnviado: usuario
      }
    }
    this.router.navigate(['/infousuario'],navigationExtras)
  }

  eliminar(usuario:any){
    this.db.eliminarUsuario(usuario.id_usuario)
    this.router.navigate(['/adminusuarios'])
  }

}
