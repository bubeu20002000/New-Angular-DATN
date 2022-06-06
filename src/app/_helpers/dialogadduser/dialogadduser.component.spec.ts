import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogadduserComponent } from './dialogadduser.component';

describe('DialogadduserComponent', () => {
  let component: DialogadduserComponent;
  let fixture: ComponentFixture<DialogadduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogadduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogadduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
