import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AppService} from "../app-service.service";

@Component({
  selector: 'app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.scss']
})
export class AppNotificationComponent implements OnInit {
  @Input() messageToDisplay:any;
  @Output() closeNotification: EventEmitter<any> = new EventEmitter();
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    let scope = this;
    setTimeout(function () {
      scope.closeNotification.emit(true);
    }, 3000);
  }

}
