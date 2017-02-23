import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {User} from "../models/user";

@Component({
    selector: 'el-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    users: User[];

    constructor(private router: Router,
                private autheService: AuthService) {
    }

    ngOnInit() {
        this.autheService.getUsers().subscribe((data) => {
            this.users=data;
        },
        err => {
            console.log(err);
        })
    }

}
