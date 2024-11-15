import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.page.html',
  styleUrls: ['./agregarcategoria.page.scss'],
})
export class AgregarcategoriaPage implements OnInit {
  categoria!: string;

  constructor(private db : DbService,private alertController: AlertController) { }

  ngOnInit() {
  }

  async guardar() {
    try {
        // Validación de campo vacío
        if (!this.categoria || this.categoria.trim() === "") {
            await this.mostrarAlerta(
                "Campo requerido",
                "Por favor ingrese el nombre de la categoría"
            );
            return;
        }

        // Validación de longitud mínima
        if (this.categoria.trim().length < 4) {
            await this.mostrarAlerta(
                "Error de validación",
                "El nombre de la categoría debe tener al menos 4 caracteres"
            );
            return;
        }

        // Validación de longitud máxima
        if (this.categoria.trim().length > 50) {
            await this.mostrarAlerta(
                "Error de validación",
                "El nombre de la categoría no puede exceder los 50 caracteres"
            );
            return;
        }

        // Realizar la inserción
        await this.db.insertarCategoria(this.categoria.trim());
        
        // Mostrar mensaje de éxito
        await this.mostrarAlerta(
            "Éxito",
            "Categoría guardada correctamente"
        );
        
        // Limpiar el campo
        this.categoria = "";
        
    } catch (error) {
        console.error('Error al guardar la categoría:', error);
        await this.mostrarAlerta(
            "Error",
            "Hubo un problema al guardar la categoría"
        );
    }
}

async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK']
    });

    await alert.present();
}

}
