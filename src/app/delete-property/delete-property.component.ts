import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../data/data-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styleUrls: ['./delete-property.component.scss']
})
export class DeletePropertyComponent implements OnInit {
  id: any = '0';
  @Output() closeDelPopup: EventEmitter<any> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
    });
  }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate([{outlets: {modal: null}}], {relativeTo: this.activatedRoute.parent});
  }

  delete() {
    this.dataService.removeProperty(this.id).subscribe((data) => {
      this.dataService.refreshSubject$.next();
      this.cancel();
    }, (error) => {
      this.dataService.showNotification$.next(error.error);
      this.cancel();
    });
  }

}
