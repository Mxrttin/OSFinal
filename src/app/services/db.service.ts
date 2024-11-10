import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Producto } from './producto';
import { Usuario } from './usuario';
import { Region } from './region';
import { Comuna } from './comuna';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Categoria } from './categoria';
import { Talla } from './talla';
import { Pedido } from './pedido';
import { Detalle } from './detalle';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  public database!: SQLiteObject;

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";
  
  tablaTalla: string = "CREATE TABLE IF NOT EXISTS talla(id_talla INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(10) NOT NULL);";

  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria(id_categoria INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, descripcion VARCHAR(100) NOT NULL, categoria VARCHAR(50) NOT NULL, foto BLOB, precio INTEGER NOT NULL, stock INTEGER NOT NULL, activo VARCHAR(50) NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(100) NOT NULL, rut TEXT NOT NULL UNIQUE, correo TEXT NOT NULL UNIQUE, telefono TEXT NOT NULL UNIQUE, clave TEXT NOT NULL, foto BLOB,region TEXT,comuna TEXT,direccion TEXT, rol INTEGER NOT NULL, FOREIGN KEY(rol) REFERENCES rol(id_rol));";

  tablaRegion: string = "CREATE TABLE IF NOT EXISTS region(id_region INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL);";
  
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, region INTEGER NOT NULL, FOREIGN KEY(region) REFERENCES region(id_region));";
  
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  tablaPedido: string = "CREATE TABLE IF NOT EXISTS pedido(id_pedido INTEGER PRIMARY KEY autoincrement, fecha_pedido TEXT NOT NULL, usuario INTEGER NOT NULL, total INTEGER NOT NULL, estado INTEGER NOT NULL, FOREIGN KEY(usuario) REFERENCES usuario(id_user),FOREIGN KEY(estado) REFERENCES estado(id_estado));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(id_detalle INTEGER PRIMARY KEY autoincrement, pedido INTEGER NOT NULL, producto INTEGER NOT NULL, cantidad INTEGER NOT NULL, subtotal INTEGER NOT NULL, FOREIGN KEY(pedido) REFERENCES pedido(id_pedido), FOREIGN KEY(producto) REFERENCES producto(id_producto));";


  // insertar datos en las tablas
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol, nombre) VALUES (1, 'Administrador')";
  registroRol2: string = "INSERT or IGNORE INTO rol(id_rol,nombre) VALUES (2,'Cliente')";

  registroTallaXS: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (1,'XS')";
  registroTallaS: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (2,'S')";
  registroTallaM: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (3,'M')";
  registroTallaL: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (4,'L')";
  registroTallaXL: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (5,'XL')";

  registroCategoriaPolera: string = "INSERT or IGNORE INTO categoria(id_categoria,nombre) VALUES (1,'Polera')"
  registroCategoriaPoleron: string = "INSERT or IGNORE INTO categoria(id_categoria,nombre) VALUES (2,'Poleron')"
  registroCategoriaFalda: string = "INSERT or IGNORE INTO categoria(id_categoria,nombre) VALUES (3,'Falda')"
  registroCategoriaShort: string = "INSERT or IGNORE INTO categoria(id_categoria,nombre) VALUES (4,'Short')"
  registroCategoriaCamisa: string = "INSERT or IGNORE INTO categoria(id_categoria,nombre) VALUES (5,'Camisa')"

  registroProducto: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (1, 'Hoodie','Hoodie corteiz Uk','Poleron','assets/image/hoodie-blue.webp',80,50,'Activo')";
  registroProducto2: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (2, 'Falda','falda denin corteiz UK','Falda','assets/image/falda-denin.webp',30,50,'Activo')";
  registroProducto3: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (3, 'Short','short alcatraz','Short','assets/image/short-denin.webp',40,50,'Activo')";
  registroProducto4: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (4, 'tan top','tan top algodon','Polera','assets/image/tan-top-blanca.webp',20,50,'Activo')";
  registroProducto5: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (5, 'Skepta tshirt','Skepta Edition','Camisa','assets/image/skeptatshirt.webp',80,50,'Activo')";
  registroProducto6: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (6, 'short rosa','Short rosa','Short','assets/image/short-rosa.webp',17,50,'Activo')";
  registroProducto7: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (7, 'club america','Especial edition','Polera','assets/image/club-america.webp',90,50,'Activo')";
  registroProducto8: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (8, 'carni special','Especial edition','Polera','assets/image/carni-special.webp',80,50,'Activo')";
  registroProducto9: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (9, 'Hoodie Mirror Balenciaga','Especial edition','Poleron','assets/image/Mirror.png',80,50,'Activo')";
  registroProducto10: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (10, 'Crop balenciaga','Especial edition','Poleron','assets/image/Balenciagazip.webp',80,50,'Activo')";

  registroAdmin: string = "INSERT or IGNORE INTO usuario (id_usuario,nombre,apellido,rut,correo,telefono,clave,foto,rol,region,comuna,direccion) VALUES (1,'Admin','Admin','99.999.999-9','Admin@gmail.com',942380742,'Admin123@','https://ionicframework.com/docs/img/demos/avatar.svg',1,'Metropolitana de Santiago','Conchali','Pasaje Cerro tololo 1160')";
  registroCliente: string = "INSERT or IGNORE INTO usuario (id_usuario,nombre,apellido,rut,correo,telefono,clave,foto,rol,region,comuna,direccion) VALUES (2,'Cliente','Cliente1','98.999.999-9','Cliente@gmail.com',942588742,'Cliente123@','https://ionicframework.com/docs/img/demos/avatar.svg',2,'','','')";

  registroEstadoEnProceso: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (1,'En proceso')";
  registroEstadoEnviado: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (2,'Enviado')";
  registroEstadoFinalizado: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (3,'Finalizado')";

  registroRegionMetropolitana: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (7,'Metropolitana de Santiago')";

  registroComunaColina: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre,region) VALUES (1,'Colina',7)"
  registroComunaConchali: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre,region) VALUES (2,'Conchali',7)"
  registroComunaHuechuraba: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre,region) VALUES (3,'Huechuraba',7)"
  registroComunaIndependencia: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre,region) VALUES (4,'Independencia',7)"
  registroComunaRecoleta: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre,region) VALUES (5,'Recoleta',7)"
  registroComunaLampa: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre,region) VALUES (6,'Lampa',7)"

  listadoRol = new BehaviorSubject([]);

  listadoTalla = new BehaviorSubject([]);

  listadoCategoria = new BehaviorSubject([]);

  listadoProducto = new BehaviorSubject([]);

  listadoUsuario = new BehaviorSubject([]);

  listadoEstado = new BehaviorSubject([]);

  listadoRegion = new BehaviorSubject([]);

  listadoComuna = new BehaviorSubject([]);

  listadoPedido = new BehaviorSubject([]); 

  listadoDetalle = new BehaviorSubject([]);

  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearDB();
  }

  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable()
  }

  fetchProducto(): Observable<Producto[]>{
    return this.listadoProducto.asObservable();
  }

  fetchCategoria(): Observable<Categoria[]>{
    return this.listadoCategoria.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listadoUsuario.asObservable();
  }

  fetchRegion(): Observable<Region[]>{
    return this.listadoRegion.asObservable()
  }

  fetchComuna(): Observable<Comuna[]>{
    return this.listadoComuna.asObservable()
  }

  fetchTalla(): Observable<Talla[]>{
    return this.listadoTalla.asObservable()
  }

  fetchPedido(): Observable<Pedido[]>{
    return this.listadoPedido.asObservable()
  }

  fetchDetalle(): Observable<Detalle[]>{
    return this.listadoDetalle.asObservable()
  }

  dbState(){
    return this.isDBReady.asObservable()
  }

  async presentAlert(titulo:string,msj:string){
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    })
    await alert.present();
  }

  crearDB(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'ocultoStudio.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.database = db;

        this.crearTablas()
        this.consultarUsuario()
        this.consultarProducto()
        this.consultarRegion()
        this.consultarComuna()
        this.consultarCategoria()
        this.consultarTalla()
        this.consultarPedido()

        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert("Creacion de base de datos", "Error creando la BD: " + JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try{

      await this.database.executeSql(this.tablaRol,[]);
      await this.database.executeSql(this.tablaTalla,[])
      await this.database.executeSql(this.tablaCategoria,[])
      await this.database.executeSql(this.tablaProducto,[]);
      await this.database.executeSql(this.tablaUsuario,[])
      await this.database.executeSql(this.tablaEstado,[]);
      await this.database.executeSql(this.tablaRegion,[])
      await this.database.executeSql(this.tablaComuna,[])
      await this.database.executeSql(this.tablaPedido,[])
      await this.database.executeSql(this.tablaDetalle,[])

      //generamos los insert en caso que existan
      await this.database.executeSql(this.registroRol,[]);
      await this.database.executeSql(this.registroRol2,[]);

      await this.database.executeSql(this.registroTallaXS,[]);
      await this.database.executeSql(this.registroTallaS,[]);
      await this.database.executeSql(this.registroTallaM,[]);
      await this.database.executeSql(this.registroTallaL,[]);
      await this.database.executeSql(this.registroTallaXL,[]);

      await this.database.executeSql(this.registroCategoriaPolera,[])
      await this.database.executeSql(this.registroCategoriaPoleron,[])
      await this.database.executeSql(this.registroCategoriaFalda,[])
      await this.database.executeSql(this.registroCategoriaShort,[])
      await this.database.executeSql(this.registroCategoriaCamisa,[])

      await this.database.executeSql(this.registroProducto,[]);
      await this.database.executeSql(this.registroProducto2,[]);
      await this.database.executeSql(this.registroProducto3,[]);
      await this.database.executeSql(this.registroProducto4,[]);
      await this.database.executeSql(this.registroProducto5,[]);
      await this.database.executeSql(this.registroProducto6,[]);
      await this.database.executeSql(this.registroProducto7,[]);
      await this.database.executeSql(this.registroProducto8,[]);
      await this.database.executeSql(this.registroProducto9,[]);
      await this.database.executeSql(this.registroProducto10,[]);
      await this.database.executeSql(this.registroAdmin,[])
      await this.database.executeSql(this.registroCliente,[])
      await this.database.executeSql(this.registroEstadoEnProceso,[]);
      await this.database.executeSql(this.registroEstadoEnviado,[]);
      await this.database.executeSql(this.registroEstadoFinalizado,[]);
      await this.database.executeSql(this.registroRegionMetropolitana,[])
      await this.database.executeSql(this.registroComunaColina,[])
      await this.database.executeSql(this.registroComunaConchali,[])
      await this.database.executeSql(this.registroComunaIndependencia,[])
      await this.database.executeSql(this.registroComunaHuechuraba,[])
      await this.database.executeSql(this.registroComunaRecoleta,[])
      await this.database.executeSql(this.registroComunaLampa,[])
    }catch(e){
      this.presentAlert("Creacion de tablas","Error creando las tablas: " + JSON.stringify(e));
    }
  }

  consultarProducto(){
    return this.database.executeSql('SELECT * FROM producto',[]).then(res=>{
      let items: Producto[] = [];

      if(res.rows.length > 0){

        for (var i = 0 ; i < res.rows.length ; i++){

          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
            categoria: res.rows.item(i).categoria, 
            foto: res.rows.item(i).foto,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            activo: res.rows.item(i).activo,
          })
        }
      }
      this.listadoProducto.next(items as any);
    })
  }

  ModificarProducto( id:string, nombre:string, descripcion:string, precio:string, stock:string,activo:string,foto:string){
    return this.database.executeSql('UPDATE producto SET nombre = ?, descripcion = ?, precio = ? , stock = ?, activo=?, foto=? WHERE id_producto=?.',[nombre,descripcion,precio,stock,activo,foto,id]).then(res=>{
      this.presentAlert("Modificar producto","Producto Modificado"),
      this.consultarProducto();
    }).catch(e=>{

    })
  }

  insertarProducto(nombre:string, descripcion:string, categoria:string, foto:string, precio:string, stock:string){
    return this.database.executeSql('INSERT INTO producto(nombre,descripcion,categoria,foto,precio,stock,activo) VALUES (?,?,?,?,?,?,"Activo")',[nombre,descripcion,categoria,foto,precio,stock]).then(res=>{
      this.presentAlert("Insertar","Producto insertado")
      this.consultarProducto();
    }).catch(e=>{
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    })
  }

  consultarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario',[]).then(res=>{
      let users: Usuario[] = [];
      if(res.rows.length > 0){
        for(var i = 0; i < res.rows.length ; i++){
          users.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            rut: res.rows.item(i).rut,
            correo: res.rows.item(i).correo,
            telefono: res.rows.item(i).telefono,
            clave: res.rows.item(i).clave,
            foto: res.rows.item(i).foto,
            rol: res.rows.item(i).rol,
            region: res.rows.item(i).region,
            comuna: res.rows.item(i).comuna,
            direccion: res.rows.item(i).direccion,
          })
        }
      }
      this.listadoUsuario.next(users as any)
    })
  }

  validarUsuario(correo: string, clave: string): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND clave = ?', [correo, clave])
      .then(res => {
        if (res.rows.length > 0) {
          const usuario: Usuario = {
            id_usuario: res.rows.item(0).id_usuario,
            nombre: res.rows.item(0).nombre,
            apellido: res.rows.item(0).apellido,
            rut: res.rows.item(0).rut,
            correo: res.rows.item(0).correo,
            telefono: res.rows.item(0).telefono,
            clave: res.rows.item(0).clave,
            foto: res.rows.item(0).foto,
            rol: res.rows.item(0).rol,
            region: res.rows.item(0).region,
            comuna: res.rows.item(0).comuna,
            direccion: res.rows.item(0).direccion,


          };
          return usuario; // Devolver el usuario encontrado
        }
        return null; // Usuario no encontrado
      })
      .catch(e => {
        console.error('Error al verificar usuario por correo y contraseña:', e);
        return null; // Manejar el error
      });
  }


  agregarDireccion(id:number,region:string,comuna:string,direccion:string){
    return this.database.executeSql('UPDATE usuario SET region = ?, comuna = ?, direccion = ? WHERE id_usuario = ?',[region,comuna,direccion,id]).then(res=>{
      this.presentAlert("Agregar Direccion","Direccion Agregada");
      this.consultarUsuario();
    }).catch(e=>{
      this.presentAlert("Agregar Direccion","Error: " + JSON.stringify(e));
    })
  }

  modificarDatos(id:number, nombre: string, apellido: string, rut:string, correo: string, telefono:number,foto:string){
    return this.database.executeSql('UPDATE usuario SET nombre = ?, apellido = ?, rut = ?, correo = ?, telefono = ?, foto = ? WHERE id_usuario = ?',[nombre,apellido,rut,correo,telefono,foto,id]).then(res=>{
      this.presentAlert("Modificar Datos","Datos modificados con exito")
      this.consultarUsuario()
    }).catch(e=>{
      this.presentAlert("Modificar Datos","Error: " + JSON.stringify(e));
    })
  }

  consultarRegion(){
    return this.database.executeSql('SELECT * FROM region',[]).then(res=>{
      let regiones: Region[] = [];

      if(res.rows.length > 0){

        for(var i = 0 ; i<res.rows.length; i++){
          regiones.push({
            id_region: res.rows.item(i).id_region,
            nombre: res.rows.item(i).nombre,
          })
        }
      }
      this.listadoRegion.next(regiones as any)
    })
  }

  consultarComuna(){
    return this.database.executeSql('SELECT * FROM comuna',[]).then(res=>{
      let comunas: Comuna[] = [];

      if(res.rows.length > 0){

        for(var i = 0 ; i<res.rows.length; i++){
          comunas.push({
            id_comuna: res.rows.item(i).id_comuna,
            nombre: res.rows.item(i).nombre,
            region: res.rows.item(i).region
          })
        }
      }
      this.listadoComuna.next(comunas as any)
    })
  }

  consultarCategoria(){
    return this.database.executeSql('SELECT * FROM categoria',[]).then(res=>{
      let categorias: Categoria[] = [];

      if(res.rows.length > 0){

        for(var i = 0 ; i<res.rows.length; i++){
          categorias.push({
            id_categoria: res.rows.item(i).id_categoria,
            nombre: res.rows.item(i).nombre,
          })
        }
      }
      this.listadoCategoria.next(categorias as any)
    })
  }

  consultarTalla(){
    return this.database.executeSql('SELECT * FROM talla',[]).then(res=>{
      let tallas: Talla[] = [];

      if(res.rows.length > 0){

        for(var i = 0 ; i<res.rows.length; i++){
          tallas.push({
            id_talla: res.rows.item(i).id_talla,
            nombre: res.rows.item(i).nombre,
          })
        }
      }
      this.listadoTalla.next(tallas as any)
    })
  }

  insertarUsuario(nombre: string, apellido: string, rut: string, correo: string, telefono: number, clave: string) {
    return this.database.executeSql("INSERT INTO usuario (nombre, apellido, rut, correo, telefono, clave, rol, foto, region, comuna, direccion) VALUES (?,?,?,?,?,?,2,'https://ionicframework.com/docs/img/demos/avatar.svg','','','')", 
    [nombre, apellido, rut, correo, telefono, clave])
    .then(res => {
      this.presentAlert("Insertar", "Usuario Insertado");
      this.consultarUsuario()
    }).catch(e => {
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    });
  }

  eliminarUsuario(id:string){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Usuario Eliminado");
      this.consultarUsuario()
    }).catch(e=>{
      this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
    })
  }

  obtenerUsuarioPorId(id: number): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?', [id])
      .then(res => {
        if (res.rows.length > 0) {
          const usuario: Usuario = {
            id_usuario: res.rows.item(0).id_usuario,
            nombre: res.rows.item(0).nombre,
            apellido: res.rows.item(0).apellido,
            rut: res.rows.item(0).rut,
            correo: res.rows.item(0).correo,
            telefono: res.rows.item(0).telefono,
            clave: res.rows.item(0).clave,
            foto: res.rows.item(0).foto,
            rol: res.rows.item(0).rol,
            region: res.rows.item(0).region,
            comuna: res.rows.item(0).comuna,
            direccion: res.rows.item(0).direccion,

          };
          return usuario;
        }
        return null;
      })
      .catch(e => {
        console.error('Error al obtener usuario por ID:', e);
        return null; 
      });
  }

  actualizarStock(id: number, stock: number){
    return this.database.executeSql('UPDATE producto set stock = ? WHERE id_producto = ?',[stock,id]).then(res=>{
      this.consultarProducto()
    })

  }

  consultarPedido(){
    return this.database.executeSql('SELECT * FROM pedido',[]).then(res=>{

      let pedidos: Pedido[] = [];

      if(res.rows.length > 0){

        for(var i = 0 ; i<res.rows.length; i++){
          pedidos.push({
            id_pedido: res.rows.item(i).id_pedido,
            fecha_pedido: res.rows.item(i).fecha_pedido,
            usuario: res.rows.item(i).usuario,
            total: res.rows.item(i).total,
            estado: res.rows.item(i).estado
          })
        }
      }
      this.listadoPedido.next(pedidos as any)


    })
  }

  insertarPedido(fecha_pedido: string, usuario: number, total: number, estado: number): Promise<number> {
    return this.database.executeSql(
      "INSERT INTO pedido(fecha_pedido,usuario,total,estado) VALUES (?,?,?,?)",
      [fecha_pedido, usuario, total, estado]
    ).then(res => {
      this.consultarPedido();
      return res.insertId;
    }).catch(e => {
      // this.presentAlert("Pedido", "Error: " + JSON.stringify(e));
      throw e;
    });
  }

  insertarDetalle(pedido: number, producto: number, cantidad: number, subtotal: number): Promise<void> {
    return this.database.executeSql(
      "INSERT INTO detalle(pedido,producto,cantidad,subtotal) VALUES (?,?,?,?)",
      [pedido, producto, cantidad, subtotal]
    ).then(() => {
      // this.presentAlert("Detalle", "Detalle realizado con éxito");
    }).catch(e => {
      // this.presentAlert("Detalle", "Error: " + JSON.stringify(e));
      throw e;
    });
  }

  obtenerDetallePedido(idPedido: number): Promise<any[]> {
    return this.database.executeSql(`
      SELECT d.*, p.nombre as nombre_producto,p.foto as foto_producto 
      FROM detalle d
      JOIN producto p ON d.producto = p.id_producto
      WHERE d.pedido = ?
    `, [idPedido]).then(res => {
      let detalles = [];
      for (let i = 0; i < res.rows.length; i++) {
        detalles.push(res.rows.item(i));
      }
      return detalles;
    });
  }

}
