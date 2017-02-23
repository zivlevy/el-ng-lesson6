import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from "../models/user";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    baseURL: string = 'http://130.211.153.28:4000';
    user:User;
    authToken:string;

    constructor(private http: Http) {

    }

    registerUser(user: User): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.baseURL + '/users/register/', user, {headers: headers})
            .map(res => res.json());
    }

    loginUser(user: User): Observable<any> {
        return Observable.create((observer) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.baseURL + '/users/authenticate/', user, {headers: headers})
                .map(res => res.json()).subscribe((res)=>{
                if (res.token) this.saveUserData(res.token,res.user);
                observer.next(res);
            });
        });
    }

    getUsers(){
        let headers = new Headers();
        let token:string = this.loadToken();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
        console.log(token);
        return this.http.get(this.baseURL + '/users/users/', {headers: headers})
            .map(res => res.json());
    }

    loadToken():string {
        return localStorage.getItem('id_token');
    }

    saveUserData(token: string, user:any) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.user=user;
        this.authToken= token;
    }

    logout(){
        this.user= null;
        this.authToken = null;
        localStorage.clear();
    }

    loggedIn() {
        return tokenNotExpired();
    }

}
