import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminproductosPage } from './adminproductos.page';

describe('AdminproductosPage', () => {
  let component: AdminproductosPage;
  let fixture: ComponentFixture<AdminproductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
