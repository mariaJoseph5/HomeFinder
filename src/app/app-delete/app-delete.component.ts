import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './app-delete.component.html',
  styleUrls: ['./app-delete.component.scss']
})
export class AppDeleteComponent implements OnInit {

  @Output() closeDelPopup: EventEmitter<any> = new EventEmitter();
  @Input() idValue:any;
  constructor(private httpClient: HttpClient, private appService: AppService) { }

  ngOnInit(): void {
  }
  cancel(){
    this.closeDelPopup.emit({openPopup: false, idValue: this.idValue});
  }
  delete(){
    this.httpClient.delete(`http://ec2-54-144-199-152.compute-1.amazonaws.com:8000/properties/${this.idValue}`, {headers: {mode: 'cors'}}).subscribe((data)=> {
      this.appService.refreshSubject$.next();
      this.cancel();
    }, (error) => {
      this.appService.showNotification$.next(error.error);
      this.cancel();
      });
  }

}
