import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { details } from '../details';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Output() newItemEvent=new EventEmitter<string>();
  item='';
  toatalBalance:number=0;
  value=false;
  value1=false;
  amount:number=0;
  finBalance='';
  constructor(private service:DataServiceService) { }
  data:details={
    userId: '',
    UserName: '',
    Balance: -1,
    AccountNo: 0,
    IFSC: ''
  };
  listOfUsers:details[]=[];
  ngOnInit(): void {
    this.httpGet();
  }
  
  httpGet(){                 //Making Call to data service for User Data
    this.service.getPosts().subscribe(data=>{
     this.listOfUsers=data;
     console.log(data);
    });
   }

   search(){                        
    this.data={userId: '',    //Function displays the Div if User is found else it will display user not found
    UserName: '',
    Balance: -1,
    AccountNo: 0,
    IFSC: ''};

    for(var i=0;i<this.listOfUsers.length;i++){
      if(this.item==this.listOfUsers[i].userId){
        this.data=this.listOfUsers[i];
      }
    }
    if(this.data.Balance > -1){
      this.value=true;
      console.log(this.data.Balance);
    }
    else
    {
      this.value=false;
    }
   
    this.toatalBalance=this.data.Balance;
   }
   transact(){                 
      if(this.data.Balance >= this.amount){
        this.data.Balance=this.data.Balance-this.amount;//this function checks available bal > = amount entered 
                                                         //if true then a success mesage is displaye
                                                         // else failure message is displayed
        this.finBalance="Transaction Successful the remaing balance is"+this.data.Balance;
        console.log("Yes im here")
      }
      else
      {
        this.finBalance="Insufficient Balance";
      }
      
      this.newItemEvent.emit(this.finBalance);
   }

}
