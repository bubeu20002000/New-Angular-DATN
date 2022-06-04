import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogaddprodComponent } from './dialogaddprod.component';

describe('DialogaddprodComponent', () => {
  let component: DialogaddprodComponent;
  let fixture: ComponentFixture<DialogaddprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogaddprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogaddprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
