import {Component, OnInit} from '@angular/core';
import {DataService} from '../data/data-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {

  isNotificationVisible = false;
  messageToDisplay = '';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.showNotification$.subscribe((value) => {
      this.isNotificationVisible = true;
      this.messageToDisplay = value.error;
    });
  }

  closeNotification() {
    this.messageToDisplay = '';
    this.isNotificationVisible = false;
  }
}
