import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppNotificationComponent} from './app-notification.component';
import {By} from '@angular/platform-browser';

describe('AppNotificationComponent', () => {
  let component: AppNotificationComponent;
  let fixture: ComponentFixture<AppNotificationComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [AppNotificationComponent]}).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeNotification after 3 seconds', fakeAsync(() => {
    spyOn(component.closeNotification, 'emit');
    component.ngOnInit();
    tick(3000);
    expect(component.closeNotification.emit).toHaveBeenCalledWith(true);
  }));

  it('should display message from input', () => {
    component.messageToDisplay = 'Test Message';
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('div'));
    expect(messageElement.nativeElement.textContent).toContain('Test Message');
  });
});
