import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarproductosPage } from './editarproductos.page';

describe('EditarproductosPage', () => {
  let component: EditarproductosPage;
  let fixture: ComponentFixture<EditarproductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
