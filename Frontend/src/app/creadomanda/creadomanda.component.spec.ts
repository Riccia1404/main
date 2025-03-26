import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadomandaComponent } from './creadomanda.component';

describe('CreadomandaComponent', () => {
  let component: CreadomandaComponent;
  let fixture: ComponentFixture<CreadomandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreadomandaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreadomandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
