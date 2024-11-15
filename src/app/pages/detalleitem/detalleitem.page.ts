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
  cantidadProductosCarrito: number = 0;

  constructor(private db: DbService, private router: Router, private activedroute: ActivatedRoute,private alertController: AlertController, private toastController: ToastController, private carrito: CarritoService) {
    this.carrito.carrito$.subscribe(items => {
      this.cantidadProductosCarrito = items.reduce((total, item) => total + item.cantidad, 0);
    });
  }

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
    if (this.cantidad < 5) {
      this.cantidad++;
    } else {
      this.mostrarAlerta('Límite alcanzado', 'No puedes agregar más de 5 unidades de este producto.');
    }
  }

  async agregarAlCarrito(producto: any) {
    if (!this.tallaSeleccionada) {
      this.mostrarAlerta('Error', 'Por favor seleccione una talla antes de agregar al carrito.');
      return;
    }

    const productosEnCarrito = await this.carrito.obtenerCantidadProducto(producto.id_producto, this.tallaSeleccionada);
    const cantidadTotal = productosEnCarrito + this.cantidad;

    if (cantidadTotal > 5) {
      this.mostrarAlerta('Límite excedido', 'No puedes agregar más de 5 unidades de este producto al carrito.');
      return;
    }

    const productoConDetalles = {
      ...producto,
      talla: this.tallaSeleccionada,
      cantidad: this.cantidad,
      stock: this.productoRecibido.stock
    };

    await this.carrito.agregarProducto(productoConDetalles);
    this.mostrarAlerta('Éxito', 'Producto agregado al carrito');
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para seleccionar talla
  seleccionarTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }

  // Método para verificar si una talla está seleccionada
  isTallaSeleccionada(talla: string): boolean {
    return this.tallaSeleccionada === talla;
  }
}
