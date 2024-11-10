import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarproductosPage } from './agregarproductos.page';

describe('AgregarproductosPage', () => {
  let component: AgregarproductosPage;
  let fixture: ComponentFixture<AgregarproductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
