import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-detalleitem',
  templateUrl: './detalleitem.page.html',
  styleUrls: ['./detalleitem.page.scss'],
})
export class DetalleitemPage implements OnInit {
  productoRecibido !: any
  cantidad: number = 1;
  tallaSeleccionada: string = '';
  arregloTalla!: any

  constructor(private db: DbService, private router: Router, private activedroute: ActivatedRoute,private alertController: AlertController, private toastController: ToastController, private carrito: CarritoService) { }

  ngOnInit() {
    this.activedroute.queryParamMap.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.productoRecibido = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado']
      }
    })

    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchTalla().subscribe(res=>{
          this.arregloTalla = res;
        })
      }
    })
  }

  restarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  sumarCantidad() {
    this.cantidad++;
  }

  agregarAlCarrito(producto: any) {
    if (!this.tallaSeleccionada) {
      alert("Por favor seleccione una talla antes de agregar al carrito.");
      return;
    }

    const productoConDetalles = {
      ...producto,
      talla: this.tallaSeleccionada,
      cantidad: this.cantidad,
      stock: this.productoRecibido.stock
    };

    this.carrito.agregarProducto(productoConDetalles);
    alert("Producto agregado al carrito");
  }

}
