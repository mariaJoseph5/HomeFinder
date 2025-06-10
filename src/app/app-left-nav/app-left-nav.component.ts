import {Component, OnInit} from '@angular/core';
import {faAddressCard, faHome, faPhone, faSearch, faSignInAlt, faStar} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './app-left-nav.component.html',
  styleUrls: ['./app-left-nav.component.scss']
})
export class AppLeftNavComponent implements OnInit {
  selected = 'HOME';
  isLoggedIn = false;
  listOfNavItems: any = [{type: faHome, heading: 'HOME', isLoggedInRoute: false}, {
    type: faSearch,
    heading: 'SEARCH FOR A PROPERTY', isLoggedInRoute: true
  }, {type: faStar, heading: 'VIEW FAVOURITES', isLoggedInRoute: true}, {
    type: faSignInAlt,
    heading: 'LOGIN',
    isLoggedInRoute: false
  }, {
    type: faAddressCard,
    heading: 'ABOUT US', isLoggedInRoute: false
  }, {type: faPhone, heading: 'CONTACT US', isLoggedInRoute: false}, {
    type: faSignInAlt,
    heading: 'LOGOUT',
    isLoggedInRoute: true
  }];

  constructor(private authService: AuthService, private route: Router) {
    this.route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url.includes('contact'))
        this.selected = 'CONTACT US';
      else if (event.url.includes('about'))
        this.selected = 'ABOUT US';
      else if (event.url.includes('search'))
        this.selected = 'SEARCH FOR A PROPERTY';
      else if (event.url.includes('view'))
        this.selected = 'VIEW FAVOURITES';
      else if (event.url.includes('login'))
        this.selected = 'LOGIN';
      else if (event.url.includes('home'))
        this.selected = 'HOME';
      if (event.url.includes('loggedIn')) {
        this.isLoggedIn = true;
      }
    });
  }

  ngOnInit(): void {
  }

  updateNav(elementName: string) {
    this.selected = elementName;
    let defaultUrl = 'public';
    if (this.isLoggedIn)
      defaultUrl = 'loggedIn';
    switch (elementName) {
      case 'HOME':
        this.route.navigate([`/${defaultUrl}/home-page`]);
        break;
      case 'SEARCH FOR A PROPERTY':
        this.route.navigate(['loggedIn/search-property', '']);
        break;
      case 'LOGIN':
        this.route.navigate(['public/login']);
        break;
      case 'VIEW FAVOURITES':
        this.route.navigate(['loggedIn/view-favourites']);
        break;
      case 'ABOUT US':
        this.route.navigate([`/${defaultUrl}/about-us`]);
        break;
      case 'CONTACT US':
        this.route.navigate([`/${defaultUrl}/contact-us`]);
        break;
      case 'LOGOUT': {
        this.authService.logout();
        this.route.navigate(['public/login']);
        break;
      }
    }
  }
}
