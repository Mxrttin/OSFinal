import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-adminpedidos',
  templateUrl: './adminpedidos.page.html',
  styleUrls: ['./adminpedidos.page.scss'],
})
export class AdminpedidosPage implements OnInit {
  arregloPedido: any

  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
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
