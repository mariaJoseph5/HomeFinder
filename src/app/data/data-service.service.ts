import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Property} from './property.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private httpClient: HttpClient) {
  }

  refreshSubject$: Subject<any> = new Subject();
  showNotification$: Subject<any> = new Subject();

  getPropertyList(): Observable<any> {
    return this.httpClient.get(`http://localhost:5000/properties`, {headers: {mode: 'cors'}});
  }

  addProperty(property: any): Observable<any> {
    return this.httpClient.post(`http://localhost:5000/properties`, property, {headers: {mode: 'cors'}});
  }

  editProperty(id: string, property: any): Observable<any> {
    return this.httpClient.put(`http://localhost:5000/properties/${id}`, property, {headers: {mode: 'cors'}});
  }

  removeProperty(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:5000/properties/${id}`, {headers: {mode: 'cors'}});
  }

  getPropertyById(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:5000/properties/${id}`, {headers: {mode: 'cors'}});
  }

  searchByParameter(propertyParam: string): Observable<any> {
    return this.httpClient.get(`http://localhost:5000/properties/search?propertyName=${propertyParam}`, {headers: {mode: 'cors'}});
  }

  addToFavourite(id: string, property: Property): Observable<any> {
    return this.httpClient.put(`http://localhost:5000/properties/${id}`, property, {headers: {mode: 'cors'}});
  }
}
