import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppHeadingComponent } from './app-heading/app-heading.component';
import { AppLeftNavComponent } from './app-left-nav/app-left-nav.component';
import { AppCardContainerComponent } from './app-card-container/app-card-container.component';
import { HttpClientModule } from '@angular/common/http';
import { AppAddComponent } from './app-add/app-add.component';
import { AppDeleteComponent } from './app-delete/app-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppNotificationComponent } from './app-notification/app-notification.component';
@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppHeadingComponent,
    AppLeftNavComponent,
    AppCardContainerComponent,
    AppAddComponent,
    AppDeleteComponent,
    AppNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
