import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { CarritoService } from 'src/app/services/carrito.service';
import { DbService } from 'src/app/services/db.service';
import { Producto } from 'src/app/services/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: any[] = [];
  total: number = 0;
  arregloUsuario: any;
  
  constructor(private carritoService: CarritoService, private db: DbService, private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = this.carritoService.obtenerTotal();
    });

    this.guardarUsuarioEnArreglo();
  }

  async guardarUsuarioEnArreglo() {
    try {
        const userId = await this.nativeStorage.getItem('userId');
        
        if (userId) {
            const usuario = await this.db.obtenerUsuarioPorId(userId);
            if (usuario) {
                this.arregloUsuario = [usuario]; // Almacena como arreglo
            } else {
                console.warn('Usuario no encontrado en la base de datos.');
                this.arregloUsuario = []; // Asegúrate de limpiar el arreglo si no se encuentra
            }
        } else {
            console.warn('No hay ID de usuario almacenado en NativeStorage.');
            this.arregloUsuario = []; // Asegúrate de limpiar el arreglo si no hay ID
        }
    } catch (error) {
        console.error('Error al obtener el ID de usuario de NativeStorage:', error);
    }
}

  incrementarCantidad(producto: any) {
    producto.cantidad += 1;
    this.carritoService.actualizarCantidad(producto.id_producto, producto.talla, producto.cantidad);
  }
  
  reducirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      this.carritoService.actualizarCantidad(producto.id_producto, producto.talla, producto.cantidad);
    } else {
      this.eliminarProducto(producto); // Elimina si la cantidad es 1
    }
  }
  
  eliminarProducto(producto: any) {
    this.carritoService.quitarProducto(producto.id_producto, producto.talla);
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }


  async pagar() {
    try {
        // Asegúrate de que el usuario esté cargado antes de proceder
        if (!this.arregloUsuario || this.arregloUsuario.length === 0) {
            alert('No hay un usuario autenticado.');
            return; // Salir si no hay usuario
        }

        const userId = this.arregloUsuario[0].id_usuario; // Accede al ID del primer usuario

        // Verificar stock antes de proceder
        for (const producto of this.carrito) {
            if (producto.stock < producto.cantidad) {
                alert(`No hay suficiente stock para ${producto.nombre}`);
                return; // Salir si no hay suficiente stock
            }
        }

        // Actualizar stock
        for (const producto of this.carrito) {
            const nuevoStock = producto.stock - producto.cantidad;
            await this.db.actualizarStock(producto.id_producto, nuevoStock);
        }

        const now = new Date();
        const fecha_pedido = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
        const estadoEnProceso = 1; 

        console.log('ID de usuario:', userId);
        
        const idPedido = await this.db.insertarPedido(fecha_pedido, userId, this.total, estadoEnProceso);

        // Insertar detalles del pedido
        for (const producto of this.carrito) {
            await this.db.insertarDetalle(idPedido, producto.id_producto, producto.cantidad, producto.precio * producto.cantidad);
        }
        
        alert('Pago realizado con éxito');
        this.vaciarCarrito();
        this.router.navigate(['/home']);
        
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        alert('Hubo un problema al realizar el pago. Detalles del error: ' + JSON.stringify(error));
    }
  } 

  
}
