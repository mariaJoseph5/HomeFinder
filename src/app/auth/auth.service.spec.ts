import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const tokenKey = 'Bearer Token';
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA';
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for valid login credentials', () => {
    const result = service.login({userName: 'admin', password: 'password'});
    expect(result).toBeTrue();
    expect(localStorage.getItem(tokenKey)).toBe(mockToken);
    expect(service.isAuthenticatedUser()).toBeTrue();
  });

  it('should return false for invalid login credentials', () => {
    const result = service.login({userName: 'user', password: 'wrong'});
    expect(result).toBeFalse();
    expect(localStorage.getItem(tokenKey)).toBeNull();
    expect(service.isAuthenticatedUser()).toBeFalse();
  });

  it('should clear auth data on logout', () => {
    service.login({userName: 'admin', password: 'password'});
    service.logout();
    expect(localStorage.getItem(tokenKey)).toBeNull();
    expect(service.isAuthenticatedUser()).toBeFalse();
  });

  it('should set isAuthenticated based on localStorage on init', () => {
    localStorage.setItem(tokenKey, mockToken);
    const newInstance = new AuthService();
    expect(newInstance.isAuthenticatedUser()).toBeTrue();
  });
});
