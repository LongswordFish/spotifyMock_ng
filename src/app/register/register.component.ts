import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import {RegisterUser} from '../RegisterUser'
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerUser:RegisterUser={userName: "", password: "", password2: ""}; 
  warning:any;
  success:boolean = false;
  loading:boolean = false; 
  sub:any;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.loading=false;
    this.success=false;
  }

  onSubmit():void{
    if(this.registerUser && (this.registerUser.password === this.registerUser.password2)){
      this.loading=true;
      this.sub=this.auth.register(this.registerUser).subscribe(()=>{
        this.success=true;
        this.warning=null;
        this.loading=false;
      },  (err)=> {
        this.success=false;
        this.warning=err.error.message;
        this.loading=false;
      });
    }else if(this.registerUser && this.registerUser.password !== this.registerUser.password2){
      this.success=false;
      this.warning="Two passwords are not the same!";
      this.loading=false;
    }else{
      console.log("something wrong");
    }
    
  
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

