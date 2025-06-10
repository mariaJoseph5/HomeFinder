import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppMainComponent} from './app-main/app-main.component';
import {AddPropertyComponent} from './add-property/add-property.component';
import {ViewPropertyContainerComponent} from './view-property-container/view-property-container.component';
import {DeletePropertyComponent} from './delete-property/delete-property.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth-guard.service';

const routes: Routes = [{
  path: 'loggedIn',
  component: AppMainComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'add-property',
    component: AddPropertyComponent,
    outlet: 'modal'
  },
    {
      path: 'edit-property/:id',
      component: AddPropertyComponent,
      outlet: 'modal'
    },
    {
      path: 'delete-property/:id',
      component: DeletePropertyComponent,
      outlet: 'modal'
    },
    {
      path: 'about-us',
      component: AboutUsComponent
    },
    {
      path: 'contact-us',
      component: ContactUsComponent
    },
    {
      path: 'home-page',
      component: ViewPropertyContainerComponent
    },
    {
      path: 'view-favourites',
      component: ViewPropertyContainerComponent
    },
    {
      path: 'search-property/:param',
      component: ViewPropertyContainerComponent
    }]
}, {
  path: 'public',
  component: AppMainComponent,
  children: [
    {
      path: 'home-page',
      component: ViewPropertyContainerComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'about-us',
      component: AboutUsComponent
    },
    {
      path: 'contact-us',
      component: ContactUsComponent
    },
    {
      path: 'home-page',
      component: ViewPropertyContainerComponent
    }]
},
  {
    path: '',
    redirectTo: '/public/home-page',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/public/home-page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
