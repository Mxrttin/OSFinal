import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.page.html',
  styleUrls: ['./adminproductos.page.scss'],
})
export class AdminproductosPage implements OnInit {

  arregloProductos: any

  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data =>{
      if(data){
        this.db.fetchProducto().subscribe(res=>{
          this.arregloProductos = res;
        })
      }
    })
  }

  modificar(item:any){
    let navigationExtras : NavigationExtras = {
      state:{
        productoEnviado: item
      }
    }
    this.router.navigate(['/editarproductos'],navigationExtras);
  }

}
