import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeleteComponent } from './app-delete.component';

describe('AppDeleteComponent', () => {
  let component: AppDeleteComponent;
  let fixture: ComponentFixture<AppDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
