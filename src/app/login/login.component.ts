import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'el-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMsg='';

  constructor(
      private authService:AuthService,
      private router:Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.errorMsg='';
    this.authService.loginUser(this.user).subscribe((res)=>{
      if (res.success) {
        console.log('success');
        this.router.navigate(['/dashboard']);

      } else {
        this.errorMsg=res.msg;
      }
    });
  }

}
