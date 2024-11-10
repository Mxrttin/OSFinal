import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminpedidosPage } from './adminpedidos.page';

describe('AdminpedidosPage', () => {
  let component: AdminpedidosPage;
  let fixture: ComponentFixture<AdminpedidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
