import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { details } from './details';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
 
  
  constructor(private http:HttpClient) { }

  getPosts(){               //Making an HTTP Get request to get data from user.json
    let url="assets/user.json";
    return this.http.get<details[]>(url);
  }
}
