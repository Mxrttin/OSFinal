import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  arregloProductos: any ;
  cantidadProductosCarrito: number = 0;

  constructor(
    private router: Router,
    private db: DbService,
    private carritoService: CarritoService
  ) {
    this.carritoService.carrito$.subscribe(items => {
      this.cantidadProductosCarrito = items.reduce((total, item) => total + item.cantidad, 0);
    });
  }

  ngOnInit () {
    this.db.dbState().subscribe(data =>{
      if(data){
        this.db.fetchProducto().subscribe(res=>{
          this.arregloProductos = res;
        })
      }
    })
  }

  visualizar(item:any){
    let navigationExtras : NavigationExtras = {
      state:{
        productoEnviado: item
      }
    }
    this.router.navigate(['/detalleitem'],navigationExtras);
  }
}
