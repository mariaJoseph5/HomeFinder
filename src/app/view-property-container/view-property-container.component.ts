import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DataService} from '../data/data-service.service';
import {faEdit, faHeart, faSearch, faTrash} from '@fortawesome/free-solid-svg-icons';
import {debounceTime, filter, switchMap} from 'rxjs/operators';
import {Property} from '../data/property.model';
import {Subject} from "rxjs";

@Component({
  selector: 'app-view-property-container',
  templateUrl: './view-property-container.component.html',
  styleUrls: ['./view-property-container.component.scss']
})
export class ViewPropertyContainerComponent implements OnInit {

  @Output() openDelPopup: EventEmitter<any> = new EventEmitter();
  propertyData: any;
  typeOfFeature = 'home';
  iconItems = [faEdit, faHeart, faTrash];
  faSearch = faSearch;
  isLoggedIn = false;
  searchParam = '';
  private searchSubject$ = new Subject<string>();

  constructor(private dataService: DataService, private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url.includes('loggedIn')) {
        this.isLoggedIn = true;
      }
      if (event.url.includes('favourites')) {
        this.typeOfFeature = 'favourites';
      } else if (event.url.includes('search')) {
        this.typeOfFeature = 'search';
      } else
        this.typeOfFeature = 'home';
    });
    this.searchSubject$.pipe(debounceTime(300), switchMap(term => this.dataService.searchByParameter(term))).subscribe((data) => {
      this.propertyData = data;
    });

  }

  ngOnInit(): void {
    this.fetchList();
    this.dataService.refreshSubject$.subscribe((value) => {
      this.fetchList();
    });
  }

  fetchList() {
    if (this.typeOfFeature == 'search')
      this.search(this.searchParam);
    else
      this.dataService.getPropertyList().subscribe((data) => {
        this.propertyData = data;
        if (this.typeOfFeature === 'favourites')
          this.propertyData = this.propertyData.filter((item: Property) => item.isFavourite == 'YES');
      });
  }

  search(searchParam: string) {
    this.searchSubject$.next(searchParam);
    this.router.navigate(['loggedIn/search-property', this.searchParam]);
  }

  callPopup(item: any, id: string) {
    switch (item) {
      case faHeart: {
        const data = this.propertyData.filter((item: Property) => item.propertyId == id)[0];
        data.isFavourite = (data.isFavourite == 'YES') ? 'NO' : 'YES';
        data.imageUrl = data.imageUrl.replace('http://localhost:5000/static/images/', '');
        this.dataService.addToFavourite(id, data).subscribe((data) => {
          this.dataService.refreshSubject$.next();
        });
      }
        break;
      case  faTrash:
        this.router.navigate([{outlets: {modal: ['delete-property', id]}}], {relativeTo: this.activatedRoute.parent});
        break;
      case faEdit:
        this.router.navigate([{outlets: {modal: ['edit-property', id]}}], {relativeTo: this.activatedRoute.parent});
        break;
    }
  }
}
