import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DeletePropertyComponent} from './delete-property.component';
import {ActivatedRoute, Router} from '@angular/router';
import {of, Subject} from 'rxjs';
import {DataService} from '../data/data-service.service';

describe('DeletePropertyComponent', () => {
  let component: DeletePropertyComponent;
  let fixture: ComponentFixture<DeletePropertyComponent>;
  let router: jasmine.SpyObj<Router>;
  let dataService: jasmine.SpyObj<DataService>;
  const mockParamMap = of({get: (key: string) => '123'});
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['removeProperty'], {
      refreshSubject$: new Subject(),
      showNotification$: new Subject()
    });
    await TestBed.configureTestingModule({
      declarations: [DeletePropertyComponent],
      providers: [{provide: Router, useValue: routerSpy}, {
        provide: DataService,
        useValue: dataServiceSpy
      }, {provide: ActivatedRoute, useValue: {paramMap: mockParamMap, parent: {}}}]
    }).compileComponents();
    fixture = TestBed.createComponent(DeletePropertyComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set id from route paramMap', () => {
    expect(component.id).toBe('123');
  });

  it('should navigate on cancel()', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call removeProperty and refresh on success', () => {
    dataService.removeProperty.and.returnValue(of({}));
    const refreshSpy = spyOn(dataService.refreshSubject$, 'next');
    const cancelSpy = spyOn(component, 'cancel');
    component.delete();
    expect(dataService.removeProperty).toHaveBeenCalledWith('123');
    expect(refreshSpy).toHaveBeenCalled();
    expect(cancelSpy).toHaveBeenCalled();
  });
});
