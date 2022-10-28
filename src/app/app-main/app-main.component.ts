import { Component, OnInit } from '@angular/core';
import {AppService} from "../app-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {

  isDeletePopupOpen = false;
  isNotificationVisible = false;
  messageToDisplay = '';
  propertyId = '';
  isAddPopupOpen = false;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.showNotification$.subscribe((value) => {
      this.isNotificationVisible = true;
      this.messageToDisplay = value.error;
    });
  }
  openAddPopup(value: any){
    this.isAddPopupOpen = value.openPopup;
  }
  openDelPopup(value: any){
    this.isDeletePopupOpen = value.openPopup;
    this.propertyId = value.idValue;
  }
  closeNotification(){
    this.messageToDisplay = '';
    this.isNotificationVisible = false;
  }
}
