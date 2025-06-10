import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppMainComponent} from './app-main.component';
import {DataService} from '../data/data-service.service';
import {Subject} from 'rxjs';

class DataServiceStub {
  showNotification$ = new Subject<any>();
}

describe('AppMainComponent', () => {
  let component: AppMainComponent;
  let fixture: ComponentFixture<AppMainComponent>;
  let dataService: DataServiceStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppMainComponent],
      providers: [{provide: DataService, useClass: DataServiceStub}]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppMainComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show notification and set message on event', () => {
    const errorMessage = {error: 'Test Error'};
    dataService.showNotification$.next(errorMessage);
    expect(component.isNotificationVisible).toBeTrue();
    expect(component.messageToDisplay).toBe('Test Error');
  });

  it('should close notification and clear message', () => {
    component.isNotificationVisible = true;
    component.messageToDisplay = 'Some message';
    component.closeNotification();
    expect(component.isNotificationVisible).toBeFalse();
    expect(component.messageToDisplay).toBe('');
  });
});
