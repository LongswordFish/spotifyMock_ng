import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import {User} from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = {userName: "", password: "",_id: ""};
  warning:any;
  loading:boolean = false;
  sub:any;


  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    if(this.user?.userName!= "" && this.user?.password!= ""){
      console.log(this.user);
      this.loading=true;
      this.sub=this.auth.login(this.user).subscribe((success)=>{
        this.warning=null;
        this.loading=false;
        console.log(success);
        localStorage.setItem('access_token',success.token);
        this.router.navigate(['/newReleases']);
      },  (err)=> {
        this.warning=err.error.message;
        this.loading=false;
      });
    }
  }

}
