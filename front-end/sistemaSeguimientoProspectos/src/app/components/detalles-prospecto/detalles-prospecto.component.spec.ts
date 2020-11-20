import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProspectoComponent } from './detalles-prospecto.component';

describe('DetallesProspectoComponent', () => {
  let component: DetallesProspectoComponent;
  let fixture: ComponentFixture<DetallesProspectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesProspectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
