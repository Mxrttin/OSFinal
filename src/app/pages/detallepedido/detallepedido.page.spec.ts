import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallepedidoPage } from './detallepedido.page';

describe('DetallepedidoPage', () => {
  let component: DetallepedidoPage;
  let fixture: ComponentFixture<DetallepedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallepedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
