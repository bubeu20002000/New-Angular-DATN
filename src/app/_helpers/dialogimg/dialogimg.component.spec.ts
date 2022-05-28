import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogimgComponent } from './dialogimg.component';

describe('DialogimgComponent', () => {
  let component: DialogimgComponent;
  let fixture: ComponentFixture<DialogimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
