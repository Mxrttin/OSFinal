import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarcategoriaPage } from './agregarcategoria.page';

describe('AgregarcategoriaPage', () => {
  let component: AgregarcategoriaPage;
  let fixture: ComponentFixture<AgregarcategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarcategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
