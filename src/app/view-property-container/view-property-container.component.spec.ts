import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ViewPropertyContainerComponent} from './view-property-container.component';
import {DataService} from '../data/data-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {of, Subject} from 'rxjs';
import {faEdit, faHeart, faTrash} from '@fortawesome/free-solid-svg-icons';

describe('ViewPropertyContainerComponent', () => {
  let component: ViewPropertyContainerComponent;
  let fixture: ComponentFixture<ViewPropertyContainerComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getPropertyList', 'searchByParameter', 'addToFavourite', 'refreshSubject$'], {refreshSubject$: new Subject<void>()});
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'events']);
    routerSpy.events = new Subject();
    await TestBed.configureTestingModule({
      declarations: [ViewPropertyContainerComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: DataService, useValue: dataServiceSpy}, {
        provide: Router,
        useValue: routerSpy
      }, {provide: ActivatedRoute, useValue: {parent: {snapshot: {}, }, }, }, ],
    }).compileComponents();
    fixture = TestBed.createComponent(ViewPropertyContainerComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn true if url contains loggedIn', () => {
    (router.events as Subject<any>).next(new NavigationEnd(1, '/loggedIn/home', '/loggedIn/home'));
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should set typeOfFeature based on url segments', () => {
    (router.events as Subject<any>).next(new NavigationEnd(1, '/loggedIn/favourites', '/loggedIn/favourites'));
    expect(component.typeOfFeature).toBe('favourites');
    (router.events as Subject<any>).next(new NavigationEnd(1, '/loggedIn/search', '/loggedIn/search'));
    expect(component.typeOfFeature).toBe('search');
    (router.events as Subject<any>).next(new NavigationEnd(1, '/loggedIn/home', '/loggedIn/home'));
    expect(component.typeOfFeature).toBe('home');
  });

  it('should fetch full property list and filter favourites', () => {
    const mockProperties = [{propertyId: '1', isFavourite: 'YES'}, {propertyId: '2', isFavourite: 'NO'}];
    dataService.getPropertyList.and.returnValue(of(mockProperties));
    component.typeOfFeature = 'favourites';
    component.fetchList();
    expect(dataService.getPropertyList).toHaveBeenCalled();
    expect(component.propertyData.length).toBe(1);
    expect(component.propertyData[0].isFavourite).toBe('YES');
  });

  it('should fetch property list without filtering if typeOfFeature is not favourites or search', () => {
    const mockProperties = [{propertyId: '1'}];
    dataService.getPropertyList.and.returnValue(of(mockProperties));
    component.typeOfFeature = 'home';
    component.fetchList();
    expect(dataService.getPropertyList).toHaveBeenCalled();
    expect(component.propertyData).toEqual(mockProperties);
  });

  it('should emit search query and navigate on search', fakeAsync(() => {
    dataService.searchByParameter.and.returnValue(of([{propertyId: 'search1'}]));
    component.searchParam = 'test';
    component.typeOfFeature = 'search';
    component.search('test');
    tick(300);
    expect(dataService.searchByParameter).toHaveBeenCalledWith('test');
    expect(router.navigate).toHaveBeenCalledWith(['loggedIn/search-property', 'test']);
  }));

  it('should toggle favourite and refresh on faHeart click', () => {
    const mockProperty = {playArea : 1, price: 2000, areaSize: 1000, clubHouse: 1, pool: 1, gym: 1, area: 'Test1', propertyName: 'Test', propertyId: '1', isFavourite: 'NO', imageUrl: 'http://localhost:5000/static/images/test.jpg'};
    dataService.addToFavourite.and.returnValue(of({}));
    component.callPopup(faHeart, '1');
    expect(mockProperty.isFavourite).toBe('YES');
    expect(mockProperty.imageUrl).toBe('test.jpg');
    expect(dataService.addToFavourite).toHaveBeenCalledWith('1', mockProperty);
  });

  it('should navigate to delete modal on faTrash click', () => {
    component.callPopup(faTrash, '1');
    expect(router.navigate).toHaveBeenCalledWith([{outlets: {modal: ['delete-property', '1']}}], {relativeTo: activatedRoute.parent});
  });

  it('should navigate to edit modal on faEdit click', () => {
    component.callPopup(faEdit, '1');
    expect(router.navigate).toHaveBeenCalledWith([{outlets: {modal: ['edit-property', '1']}}], {relativeTo: activatedRoute.parent});
  });
});
