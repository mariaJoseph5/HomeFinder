import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DataService} from '../data/data-service.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  id: any = '';
  isEditable = false;
  propertyGroup: any;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient, private dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url.includes('edit')) {
        this.isEditable = true;
        this.activatedRoute.paramMap.subscribe(param => {
          this.id = param.get('id');
          this.dataService.getPropertyById(this.id).subscribe((data) => {
            const imgUrl = data.imageUrl;
            this.propertyGroup.patchValue({
              ...data,
              imageUrl: imgUrl.replace('http://localhost:5000/static/images/', '')
            });
          });
        });
      } else
        this.propertyGroup.reset();
    });
  }

  ngOnInit(): void {
    this.propertyGroup = this.formBuilder.group({
      propertyId: '',
      propertyName: ['', Validators.required],
      price: [null, Validators.required],
      area: ['', Validators.required],
      areaSize: [null, Validators.required],
      pool: [null, Validators.required],
      gym: [null, Validators.required],
      playArea: [null, Validators.required],
      clubHouse: [null, Validators.required],
      isFavourite: ['NO'],
      imageUrl: ['']
    });
  }

  submitForm() {
    if (this.isEditable)
      this.dataService.editProperty(this.id, this.propertyGroup.value).subscribe((data) => {
        this.cancel();
        this.dataService.refreshSubject$.next();
      }, (error) => {
        this.dataService.showNotification$.next(error.error);
        this.cancel();
      });
    else
      this.dataService.addProperty(this.propertyGroup.value).subscribe((data) => {
        this.cancel();
        this.dataService.refreshSubject$.next();
      }, (error) => {
        this.dataService.showNotification$.next(error.error);
        this.cancel();
      });
  }

  cancel() {
    this.router.navigate([{outlets: {modal: null}}], {relativeTo: this.activatedRoute.parent});
  }

}
