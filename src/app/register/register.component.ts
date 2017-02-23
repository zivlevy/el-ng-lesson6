import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
    selector: 'el-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: User = new User();
    passwordMsg = "";
    errorMsg="";

    constructor(
        private authService: AuthService,
        private  router:Router
    ) {
    }

    ngOnInit() {
    }

    onRegisterSubmit() {
        this.errorMsg = '';
        this.authService.registerUser(this.user).subscribe((res) => {
            if (res.success) {
                this.router.navigate((['/login']));
            } else {
                this.errorMsg=res.msg;
            }
        });
    }

    validatePassword() {
        this.passwordMsg = "";
        if (this.user.password.substr(0, 1) !== 'Z') {
            this.passwordMsg = "Password should start with Z";
        }
        else if (this.user.password.length < 8) {
            this.passwordMsg = "Password should be at least 8 letters";
        }

    }
}
