import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../auth/auth.service';
import {DataService} from '../data/data-service.service';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {Subject} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const dataSpy = jasmine.createSpyObj('DataService', [], {showNotification$: new Subject<any>()});
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: authSpy}, {
        provide: DataService,
        useValue: dataSpy
      }, {provide: Router, useValue: routerSpy}]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form controls as invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
    component.loginForm.controls.userName.setValue('user');
    component.loginForm.controls.password.setValue('pass');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should login successfully and navigate', () => {
    authService.login.and.returnValue(true);
    component.loginForm.setValue({userName: 'admin', password: 'password'});
    component.loginFunc();
    expect(authService.login).toHaveBeenCalledWith(component.loginForm.value);
    expect(component.isLoggedIn).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith(['/loggedIn/home-page']);
  });

  it('should fail login and show notification', () => {
    authService.login.and.returnValue(false);
    component.loginForm.setValue({userName: 'wrong', password: 'wrong'});
    const notificationSpy = spyOn(dataService.showNotification$, 'next');
    component.loginFunc();
    expect(authService.login).toHaveBeenCalledWith(component.loginForm.value);
    expect(component.isLoggedIn).toBeFalse();
    expect(notificationSpy).toHaveBeenCalledWith({error: 'Login Attempt Failed!'});
  });
});
