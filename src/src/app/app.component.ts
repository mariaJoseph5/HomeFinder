import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bankingapp';
  value=false;
 
  onclick(){
    this.value=!this.value;
  }
 
  displayAlert(value:string){
     alert(value);
  }
}
