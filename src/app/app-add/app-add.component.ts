import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from "../app-service.service";

@Component({
  selector: 'app-add',
  templateUrl: './app-add.component.html',
  styleUrls: ['./app-add.component.scss']
})
export class AppAddComponent implements OnInit {

  propertyGroup: any;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private appService: AppService) { }

  ngOnInit(): void {
   this.propertyGroup = this.formBuilder.group({
     propertyName: ['', Validators.required],
     price: [null, Validators.required],
     area: ['', Validators.required],
     areaSize: [null, Validators.required],
     pool: [null, Validators.required],
     gym: [null, Validators.required],
     playArea: [null, Validators.required],
     clubHouse: [null, Validators.required]
   });
  }
  submitForm(){
    this.httpClient.put(`http://ec2-54-144-199-152.compute-1.amazonaws.com:8000/properties`, this.propertyGroup.value, {headers: {mode: 'cors'}}).subscribe((data)=> {
      this.appService.refreshSubject$.next();
      this.closePopup.emit({openPopup: false});
    },(error) => {
      this.appService.showNotification$.next(error.error);
      this.closePopup.emit({openPopup: false});
    });
  }
}
