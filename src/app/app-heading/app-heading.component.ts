import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-heading',
  templateUrl: './app-heading.component.html',
  styleUrls: ['./app-heading.component.scss']
})
export class AppHeadingComponent implements OnInit {
  @Output() openPopup: EventEmitter<any> = new EventEmitter();
  isLoggedIn = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url.includes('loggedIn')) {
        this.isLoggedIn = true;
      }
    });
  }

  ngOnInit(): void {

  }

  callPopup() {
    this.router.navigate([{outlets: {modal: ['add-property']}}], {relativeTo: this.activatedRoute});
  }
}
