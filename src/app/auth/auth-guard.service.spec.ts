import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from './auth-guard.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticatedUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthGuard, {provide: AuthService, useValue: authSpy}, {
        provide: Router,
        useValue: routerSpy
      }]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation if user is authenticated', () => {
    authService.isAuthenticatedUser.and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should prevent activation and navigate to login if not authenticated', () => {
    authService.isAuthenticatedUser.and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
