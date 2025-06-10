import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppHeadingComponent} from './app-heading.component';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';

class RouterStub {
  events = new Subject<any>();
  navigate = jasmine.createSpy('navigate');
}

class ActivatedRouteStub {
}

describe('AppHeadingComponent', () => {
  let component: AppHeadingComponent;
  let fixture: ComponentFixture<AppHeadingComponent>;
  let router: RouterStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeadingComponent],
      providers: [{provide: Router, useClass: RouterStub}, {provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeadingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true if url contains "loggedIn"', () => {
    router.events.next(new NavigationEnd(1, '/home/loggedIn', '/home/loggedIn'));
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should set isLoggedIn to false if url does not contain "loggedIn"', () => {
    router.events.next(new NavigationEnd(1, '/home', '/home'));
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should navigate to modal route on callPopup()', () => {
    component.callPopup();
    expect(router.navigate).toHaveBeenCalled();
  });
});

