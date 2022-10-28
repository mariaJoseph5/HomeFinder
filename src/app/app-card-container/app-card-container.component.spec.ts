import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardContainerComponent } from './app-card-container.component';

describe('AppCardContainerComponent', () => {
  let component: AppCardContainerComponent;
  let fixture: ComponentFixture<AppCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
