import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AddPropertyComponent} from './add-property.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {of, Subject} from 'rxjs';
import {DataService} from '../data/data-service.service';

class RouterStub {
  events = new Subject<any>();
  navigate = jasmine.createSpy('navigate');
}

class ActivatedRouteStub {
  parent = {snapshot: {}, paramMap: of()};
}

class DataServiceStub {
  refreshSubject$ = new Subject();
  showNotification$ = new Subject();

  addProperty(data: any): any {
    return of(data);
  }

  editProperty(id: any, data: any): any {
    return of(data);
  }
}

describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;
  let router: RouterStub;
  let dataService: DataServiceStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPropertyComponent],
      imports: [ReactiveFormsModule],
      providers: [{provide: Router, useClass: RouterStub}, {
        provide: ActivatedRoute,
        useClass: ActivatedRouteStub
      }, {provide: DataService, useClass: DataServiceStub}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    dataService = TestBed.inject(DataService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.propertyGroup).toBeDefined();
    expect(component.propertyGroup.controls.propertyName).toBeDefined();
  });

  it('should load property on edit mode', fakeAsync(() => {
    router.events.next(new NavigationEnd(1, '/edit/123', '/edit/123'));
    tick();
    fixture.detectChanges();
    expect(component.isEditable).toBeTrue();
    expect(component.propertyGroup.value.propertyName).toBe('Test Property');
    expect(component.propertyGroup.value.imageUrl).toBe('test.jpg');
  }));

  it('should call addProperty when submitting in add mode', () => {
    spyOn(dataService, 'addProperty').and.callThrough();
    component.isEditable = false;
    component.ngOnInit();
    component.propertyGroup.patchValue({
      propertyName: 'New Property',
      price: 2000,
      area: 'Area 51',
      areaSize: 300,
      pool: true,
      gym: true,
      playArea: true,
      clubHouse: true,
      isFavourite: 'NO',
      imageUrl: ''
    });
    component.submitForm();
    expect(dataService.addProperty).toHaveBeenCalled();
  });

  it('should call editProperty when submitting in edit mode', () => {
    spyOn(dataService, 'editProperty').and.callThrough();
    component.isEditable = true;
    component.id = '123';
    component.ngOnInit();
    component.propertyGroup.patchValue({
      propertyName: 'Edited Property',
      price: 3000,
      area: 'Edited Area',
      areaSize: 400,
      pool: false,
      gym: false,
      playArea: false,
      clubHouse: false,
      isFavourite: 'YES',
      imageUrl: ''
    });
    component.submitForm();
    expect(dataService.editProperty).toHaveBeenCalledWith('123', component.propertyGroup.value);
  });
});

