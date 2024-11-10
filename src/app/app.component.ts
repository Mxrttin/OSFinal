// app.component.ts
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: `
<ion-app>
  <ion-menu-toggle>
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
    
        <ion-content>
          <ion-list>
            <!-- Elementos comunes para todos -->
            <ion-item [routerDirection]="'root'" [routerLink]="'/home'">
              <ion-icon slot="start" name="home"></ion-icon>
              <ion-label>HomeStudio</ion-label>
            </ion-item>

            <!-- Elementos para usuarios logueados -->
            <ng-container *ngIf="userId">
              <ion-item [routerDirection]="'root'" [routerLink]="'/carrito'">
                <ion-icon slot="start" name="cart"></ion-icon>
                <ion-label>Carrito</ion-label>
              </ion-item>

              <ion-item [routerDirection]="'root'" [routerLink]="'/cuenta'">
                <ion-icon slot="start" name="person"></ion-icon>
                <ion-label>Cuenta</ion-label>
              </ion-item>

              <!-- Solo para administradores -->
              <ion-item *ngIf="rolId === '1'" [routerDirection]="'root'" [routerLink]="'/adminprincipal'">
                <ion-icon slot="start" name="settings"></ion-icon>
                <ion-label>Admin</ion-label>
              </ion-item>

              <!-- Solo para clientes -->
              <ion-item *ngIf="rolId === '2'" [routerDirection]="'root'" [routerLink]="'/catalogo'">
                <ion-icon slot="start" name="flame"></ion-icon>
                <ion-label>CatalogoOculto</ion-label>
              </ion-item>

              <ion-item (click)="cerrarSesion()" button>
                <ion-icon slot="start" name="log-out"></ion-icon>
                <ion-label>Cerrar Sesión</ion-label>
              </ion-item>
            </ng-container>

            <!-- Solo para usuarios no logueados -->
            <ion-item *ngIf="!userId" [routerDirection]="'root'" [routerLink]="'/login'">
              <ion-icon slot="start" name="log-in"></ion-icon>
              <ion-label>Ingresar/Registrarse</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
    </ion-menu-toggle>  
  <ion-router-outlet id="main-content"></ion-router-outlet>
</ion-app>
  `
})
export class AppComponent implements OnInit {
  userId: string | null = null;
  rolId: string | null = null;

  constructor(
    private nativeStorage: NativeStorage,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.checkSession();

    // Observa cambios de navegación para actualizar sesión si es necesario
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkSession();
      }
    });
  }

  private async checkSession() {
    try {
      this.userId = await this.nativeStorage.getItem('userId');
      this.rolId = await this.nativeStorage.getItem('rolId');
    } catch {
      this.userId = null;
      this.rolId = null;
    }
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, cerrar',
          handler: async () => {
            try {
              await this.nativeStorage.clear();
              this.userId = null;
              this.rolId = null;
              await this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              this.mostrarError('Error al cerrar sesión');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}