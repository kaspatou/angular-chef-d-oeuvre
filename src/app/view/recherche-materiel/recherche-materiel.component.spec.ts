import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheMaterielComponent } from './recherche-materiel.component';

describe('RechercheMaterielComponent', () => {
  let component: RechercheMaterielComponent;
  let fixture: ComponentFixture<RechercheMaterielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheMaterielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
