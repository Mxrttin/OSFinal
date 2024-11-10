import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-pedidosusuarios',
  templateUrl: './pedidosusuarios.page.html',
  styleUrls: ['./pedidosusuarios.page.scss'],
})
export class PedidosusuariosPage implements OnInit {
  usuarioRecibido: any;

  arregloPedido!: any

  constructor(private router: Router, private db: DbService, private activedroute: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado']
      }
    })

    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchPedido().subscribe(res=>{
          this.arregloPedido = res;
        })
      }
    })
  }

  visualizarPedido(pedido: any){
    let navigationExtras: NavigationExtras = {

      state:{
        pedidoEnviado: pedido
      }
    }
    this.router.navigate(['/detallepedido'],navigationExtras)
  }

}
