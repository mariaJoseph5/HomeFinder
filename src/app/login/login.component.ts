import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {DataService} from '../data/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  isLoggedIn = false;
  hasAttemptedLogin = false;
  errorMessage = 'Login failed! The user name or password is invalid.';
  loginForm = this.fb.group({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private dataService: DataService, private auth: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  loginFunc() {
    this.isLoggedIn = this.auth.login(this.loginForm.value);
    if (this.isLoggedIn) {
      this.router.navigate(['/loggedIn/home-page']);
    } else {
      this.dataService.showNotification$.next({error: 'Login Attempt Failed!'});
    }
  }
}
