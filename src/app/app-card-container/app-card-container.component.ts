import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router } from '@angular/router';
import {AppService} from "../app-service.service";
@Component({
  selector: 'app-card-container',
  templateUrl: './app-card-container.component.html',
  styleUrls: ['./app-card-container.component.scss']
})
export class AppCardContainerComponent implements OnInit {

  @Output() openDelPopup: EventEmitter<any> = new EventEmitter();
  propertyData: any;
  constructor(private appService:AppService, private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchList();
    this.appService.refreshSubject$.subscribe((value) => {
      this.fetchList();
    });
  }
  fetchList(){
    this.httpClient.get(`http://ec2-54-144-199-152.compute-1.amazonaws.com:8000/properties`, {headers: {mode: 'cors'}}).subscribe((data)=> {
      this.propertyData = data;
    });
  }
  fetchUrl(index: number) {
    return "../../assets/image-"+index+".jpeg";
  }
  callPopup(id: any) {
    this.openDelPopup.emit({openPopup: true, idValue: id});
  }
  fetchData(data: any) {
    return (data == "TRUE") ? "YES" : "NO";
  }
}
