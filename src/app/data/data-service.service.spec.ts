import {TestBed} from '@angular/core/testing';
import {DataService} from './data-service.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Property} from './property.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5000/properties';
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [DataService]});
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch property list', () => {
    service.getPropertyList().subscribe();
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should add a property', () => {
    const property = {propertyName: 'Test'};
    service.addProperty(property).subscribe();
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(property);
    req.flush({});
  });

  it('should edit a property by id', () => {
    const property = {propertyName: 'Updated'};
    service.editProperty('1', property).subscribe();
    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(property);
    req.flush({});
  });

  it('should delete a property by id', () => {
    service.removeProperty('1').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get property by id', () => {
    service.getPropertyById('1').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should search properties by parameter', () => {
    service.searchByParameter('Test').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/search?propertyName=Test`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should add property to favourites', () => {
    const property: Property = {
      propertyId: '1',
      propertyName: 'Fav',
      price: 1000,
      area: '',
      areaSize: 0,
      pool: 1,
      gym: 1,
      playArea: 1,
      clubHouse: 1,
      isFavourite: 'YES'
    };
    service.addToFavourite('1', property).subscribe();
    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(property);
    req.flush({});
  });

  it('should have a refreshSubject$ observable', () => {
    service.refreshSubject$.subscribe(value => {
      expect(value).toBe('test');
    });
    service.refreshSubject$.next('test');
  });

  it('should have a showNotification$ observable', () => {
    service.showNotification$.subscribe(value => {
      expect(value).toEqual({error: 'test error'});
    });
    service.showNotification$.next({error: 'test error'});
  });
});

