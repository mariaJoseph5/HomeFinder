import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  refreshSubject$:Subject<any> = new Subject();
  showNotification$:Subject<any> = new Subject();
}
