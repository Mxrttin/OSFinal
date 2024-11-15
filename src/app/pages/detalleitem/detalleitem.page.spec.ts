import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleitemPage } from './detalleitem.page';
import { AlertController } from '@ionic/angular';

describe('DetalleitemPage', () => {
  let component: DetalleitemPage;
  let fixture: ComponentFixture<DetalleitemPage>;
  let alertController: AlertController;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe incrementar cantidad cuando es menor a 5', () => {
    // Arrange
    component.cantidad = 3;

    // Act
    component.sumarCantidad();

    // Assert
    expect(component.cantidad).toBe(4);
    expect(alertController.create).not.toHaveBeenCalled();
  });

});
