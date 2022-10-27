import { Component, OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
 @Input() item1={
  userId: '',
    UserName: '',
    Balance: -1,
    AccountNo: 0,
    IFSC: ''
 };
  constructor() { }
  amount=0;
  tolabalnce=1000;
  ngOnInit(): void {
  }
  
 }
