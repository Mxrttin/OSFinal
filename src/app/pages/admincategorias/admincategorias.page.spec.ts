import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmincategoriasPage } from './admincategorias.page';

describe('AdmincategoriasPage', () => {
  let component: AdmincategoriasPage;
  let fixture: ComponentFixture<AdmincategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
