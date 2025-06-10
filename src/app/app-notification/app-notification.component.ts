import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.scss']
})
export class AppNotificationComponent implements OnInit {
  @Input() messageToDisplay: any;
  @Output() closeNotification: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    const scope = this;
    setTimeout(() => {
      scope.closeNotification.emit(true);
    }, 3000);
  }

}
