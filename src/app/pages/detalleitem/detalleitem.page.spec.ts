import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleitemPage } from './detalleitem.page';

describe('DetalleitemPage', () => {
  let component: DetalleitemPage;
  let fixture: ComponentFixture<DetalleitemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
