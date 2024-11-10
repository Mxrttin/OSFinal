import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.carrito.asObservable();

  constructor() { }

  agregarProducto(producto: any) {
    let productos = this.carrito.getValue();
    const index = productos.findIndex(
      (p) => p.id_producto === producto.id_producto && p.talla === producto.talla && p.stock === producto.stock
    );

    if (index > -1) {
      // Si el producto ya está en el carrito, no lo duplicamos; solo incrementamos la cantidad
      productos[index].cantidad += producto.cantidad;
    } else {
      // Si no existe, lo agregamos al carrito
      productos.push({ ...producto });
    }
    this.carrito.next(productos);
  }

  actualizarCantidad(id_producto: string, talla: string, nuevaCantidad: number) {
    let productos = this.carrito.getValue();
    const index = productos.findIndex(
      (p) => p.id_producto === id_producto && p.talla === talla
    );

    if (index > -1) {
      productos[index].cantidad = nuevaCantidad;
      if (productos[index].cantidad <= 0) {
        productos.splice(index, 1); // Elimina si la cantidad es 0 o menos
      }
      this.carrito.next(productos);
    }
  }

  quitarProducto(id_producto: string, talla: string) {
    let productos = this.carrito.getValue().filter(
      (p) => !(p.id_producto === id_producto && p.talla === talla)
    );
    this.carrito.next(productos);
  }

  vaciarCarrito() {
    this.carrito.next([]);
  }

  obtenerTotal() {
    return this.carrito.getValue().reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  }
}
