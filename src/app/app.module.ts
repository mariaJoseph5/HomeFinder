import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app-main/app-main.component';
import {AppHeadingComponent} from './app-heading/app-heading.component';
import {AppLeftNavComponent} from './app-left-nav/app-left-nav.component';
import {ViewPropertyContainerComponent} from './view-property-container/view-property-container.component';
import {HttpClientModule} from '@angular/common/http';
import {DeletePropertyComponent} from './delete-property/delete-property.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppNotificationComponent} from './app-notification/app-notification.component';
import {AddPropertyComponent} from './add-property/add-property.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppHeadingComponent,
    AppLeftNavComponent,
    AddPropertyComponent,
    ViewPropertyContainerComponent,
    DeletePropertyComponent,
    AppNotificationComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
