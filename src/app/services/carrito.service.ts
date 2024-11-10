import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.carrito.asObservable();
  private currentUserId: string | null = null;

  constructor(private nativeStorage: NativeStorage) {}

  async cargarCarritoUsuario(userId: string) {
    try {
      this.currentUserId = userId;
      const carritoKey = `carrito_${userId}`;
      const carritoGuardado = await this.nativeStorage.getItem(carritoKey);
      console.log('Carrito cargado:', carritoGuardado);
      
      if (carritoGuardado) {
        this.carrito.next(carritoGuardado);
      } else {
        this.carrito.next([]);
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      this.carrito.next([]);
    }
  }

  private async guardarCarrito(productos: any[]) {
    if (!this.currentUserId) {
      console.error('No hay usuario actual');
      return;
    }
    
    try {
      const carritoKey = `carrito_${this.currentUserId}`;
      await this.nativeStorage.setItem(carritoKey, productos);
      console.log('Carrito guardado:', productos);
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }

  async agregarProducto(producto: any) {
    const productos = this.carrito.getValue();
    const index = productos.findIndex(
      (p) => p.id_producto === producto.id_producto && 
            p.talla === producto.talla
    );

    if (index > -1) {
      productos[index].cantidad += producto.cantidad;
    } else {
      productos.push({ ...producto });
    }
    
    this.carrito.next(productos);
    await this.guardarCarrito(productos);
    console.log('Producto agregado:', producto);
  }

  async actualizarCantidad(id_producto: string, talla: string, nuevaCantidad: number) {
    const productos = this.carrito.getValue();
    const index = productos.findIndex(
      (p) => p.id_producto === id_producto && p.talla === talla
    );

    if (index > -1) {
      productos[index].cantidad = nuevaCantidad;
      if (productos[index].cantidad <= 0) {
        productos.splice(index, 1);
      }
      this.carrito.next(productos);
      await this.guardarCarrito(productos);
      console.log('Cantidad actualizada:', productos);
    }
  }

  async quitarProducto(id_producto: string, talla: string) {
    const productos = this.carrito.getValue().filter(
      (p) => !(p.id_producto === id_producto && p.talla === talla)
    );
    this.carrito.next(productos);
    await this.guardarCarrito(productos);
    console.log('Producto eliminado, carrito actual:', productos);
  }

  async vaciarCarrito() {
    if (!this.currentUserId) return;
    
    try {
      const carritoKey = `carrito_${this.currentUserId}`;
      await this.nativeStorage.remove(carritoKey);
      this.carrito.next([]);
      console.log('Carrito vaciado');
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  }

  obtenerTotal() {
    return this.carrito.getValue().reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad, 
      0
    );
  }

  // Método para cuando el usuario cierra sesión
  async limpiarCarritoLocal() {
    this.currentUserId = null;
    this.carrito.next([]);
  }
}