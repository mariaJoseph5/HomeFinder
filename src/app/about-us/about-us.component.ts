import {Component, OnInit} from '@angular/core';
import {
  faBullseye,
  faCommentDots,
  faHandshake,
  faHome,
  faMobile,
  faSearchLocation,
  faTrophy,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  faComment = faCommentDots;
  faMobile = faMobile;
  faHandShake = faHandshake;
  faLocation = faSearchLocation;
  faHome = faHome;
  faPerson = faUserAlt;
  faTrophy = faTrophy;
  faBullsEye = faBullseye;

  constructor() {
  }

  ngOnInit(): void {
  }

}
