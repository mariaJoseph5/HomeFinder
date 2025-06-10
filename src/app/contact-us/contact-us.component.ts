import {Component, OnInit} from '@angular/core';
import {
  faClock,
  faCommentDots,
  faEnvelope,
  faPhoneAlt,
  faPhoneSquare,
  faSearchLocation,
  faShareAltSquare
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  faPhone = faPhoneAlt;
  faEnvelope = faEnvelope;
  faClock = faClock;
  faLocation = faSearchLocation;
  faShare = faShareAltSquare;
  faComment = faCommentDots;
  faTelephone = faPhoneSquare;

  constructor() {
  }

  ngOnInit(): void {
  }

}
