import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './app-heading.component.html',
  styleUrls: ['./app-heading.component.scss']
})
export class AppHeadingComponent implements OnInit {
  @Output() openPopup: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  callPopup(){
    this.openPopup.emit({openPopup: true});
  }
}
