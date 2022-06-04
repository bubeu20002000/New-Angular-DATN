import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfixprodComponent } from './dialogfixprod.component';

describe('DialogfixprodComponent', () => {
  let component: DialogfixprodComponent;
  let fixture: ComponentFixture<DialogfixprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfixprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfixprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
