import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarpasswordPage } from './cambiarpassword.page';

describe('CambiarpasswordPage', () => {
  let component: CambiarpasswordPage;
  let fixture: ComponentFixture<CambiarpasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
