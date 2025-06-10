import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppLeftNavComponent} from './app-left-nav.component';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';

class RouterStub {
  events = new Subject<any>();
  navigate = jasmine.createSpy('navigate');
}

class AuthServiceStub {
  logout = jasmine.createSpy('logout');
}

describe('AppLeftNavComponent', () => {
  let component: AppLeftNavComponent;
  let fixture: ComponentFixture<AppLeftNavComponent>;
  let router: RouterStub;
  let authService: AuthServiceStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppLeftNavComponent],
      providers: [{provide: Router, useClass: RouterStub}, {provide: AuthService, useClass: AuthServiceStub}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLeftNavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    authService = TestBed.inject(AuthService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected nav based on URL', () => {
    router.events.next(new NavigationEnd(1, '/public/contact-us', '/public/contact-us'));
    expect(component.selected).toBe('CONTACT US');
    router.events.next(new NavigationEnd(1, '/loggedIn/view-favourites', '/loggedIn/view-favourites'));
    expect(component.selected).toBe('VIEW FAVOURITES');
  });

  it('should set isLoggedIn to true if url includes "loggedIn"', () => {
    router.events.next(new NavigationEnd(1, '/loggedIn/home-page', '/loggedIn/home-page'));
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should navigate to correct route on updateNav', () => {
    component.isLoggedIn = true;
    component.updateNav('HOME');
    expect(router.navigate).toHaveBeenCalledWith(['/loggedIn/home-page']);
    component.updateNav('ABOUT US');
    expect(router.navigate).toHaveBeenCalledWith(['/loggedIn/about-us']);
    component.updateNav('CONTACT US');
    expect(router.navigate).toHaveBeenCalledWith(['/loggedIn/contact-us']);
    component.updateNav('SEARCH FOR A PROPERTY');
    expect(router.navigate).toHaveBeenCalledWith(['loggedIn/search-property', '']);
    component.updateNav('VIEW FAVOURITES');
    expect(router.navigate).toHaveBeenCalledWith(['loggedIn/view-favourites']);
  });

  it('should navigate to login on LOGIN when not logged in', () => {
    component.isLoggedIn = false;
    component.updateNav('LOGIN');
    expect(router.navigate).toHaveBeenCalledWith(['public/login']);
  });

  it('should call logout and navigate to login on LOGOUT', () => {
    component.isLoggedIn = true;
    component.updateNav('LOGOUT');
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['public/login']);
  });
});
