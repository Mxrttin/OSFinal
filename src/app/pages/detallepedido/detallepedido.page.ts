import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-detallepedido',
  templateUrl: './detallepedido.page.html',
  styleUrls: ['./detallepedido.page.scss'],
})
export class DetallepedidoPage implements OnInit {
  pedidoRecibido: any;

  arregloDetalle:any

  detalles: any[] = [];
  totalPedido: number = 0;

  constructor(private bd: DbService, private router: Router, private activedroute: ActivatedRoute, private alertController : AlertController) {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.pedidoRecibido = this.router.getCurrentNavigation()?.extras?.state?.['pedidoEnviado'];
      }
    })
  }

  ngOnInit() {
    this.bd.dbState().subscribe(data =>{
      if(data){
        this.bd.fetchDetalle().subscribe(res=>{
          this.arregloDetalle = res;
        })
      }
    })

    this.cargarDetallesPedido();
  }

  mostrarDetallePedido(idPedido: number) {
    let navigationExtras: NavigationExtras = {
      state:{
        detalleEnviado: idPedido
      }
    }
    this.router.navigate(['/verdetalle',idPedido],navigationExtras);
  }

  async cargarDetallesPedido() {
    try {
      this.detalles = await this.bd.obtenerDetallePedido(this.pedidoRecibido.id_pedido);
      this.totalPedido = this.detalles.reduce((total, detalle) => total + detalle.subtotal, 0);
    } catch (error) {
      console.error('Error al cargar los detalles del pedido:', error);
    }
  }

}
