import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPretComponent } from './gestion-pret.component';

describe('GestionPretComponent', () => {
  let component: GestionPretComponent;
  let fixture: ComponentFixture<GestionPretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
