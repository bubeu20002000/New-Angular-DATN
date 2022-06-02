import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginfoorderComponent } from './dialoginfoorder.component';

describe('DialoginfoorderComponent', () => {
  let component: DialoginfoorderComponent;
  let fixture: ComponentFixture<DialoginfoorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginfoorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginfoorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
