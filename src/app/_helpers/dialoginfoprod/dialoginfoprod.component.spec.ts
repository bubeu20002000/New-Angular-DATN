import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginfoprodComponent } from './dialoginfoprod.component';

describe('DialoginfoprodComponent', () => {
  let component: DialoginfoprodComponent;
  let fixture: ComponentFixture<DialoginfoprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginfoprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginfoprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
