import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'isAdmin']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for admin users', () => {
    authServiceMock.isLoggedIn.and.returnValue(true);
    authServiceMock.isAdmin.and.returnValue(true);
    
    expect(guard.canActivate()).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to principal for non-admin users', () => {
    authServiceMock.isLoggedIn.and.returnValue(true);
    authServiceMock.isAdmin.and.returnValue(false);
    
    expect(guard.canActivate()).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/principal'], jasmine.any(Object));
  });

  it('should redirect to login for unauthenticated users', () => {
    authServiceMock.isLoggedIn.and.returnValue(false);
    
    expect(guard.canActivate()).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/loginpage']);
  });
});
