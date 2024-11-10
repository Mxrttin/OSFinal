import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfousuarioPage } from './infousuario.page';

describe('InfousuarioPage', () => {
  let component: InfousuarioPage;
  let fixture: ComponentFixture<InfousuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfousuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
