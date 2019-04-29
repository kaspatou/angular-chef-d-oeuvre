import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionParcComponent } from './gestion-parc.component';

describe('GestionParcComponent', () => {
  let component: GestionParcComponent;
  let fixture: ComponentFixture<GestionParcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionParcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
