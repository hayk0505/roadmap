import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';
import { delay, shareReplay, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

    // login(email:string, password:string ) {
    //     return this.http.post<IUser>('/api/login', {email, password})
    //         // this is just the HTTP call,
    //         // we still need to handle the reception of the token
    //         .shareReplay();
    // }

    isUserLoggedIn: boolean = false;

    login(userName: string, password: string): Observable<any> {
       console.log(userName);
       console.log(password);
       this.isUserLoggedIn = userName == 'admin' && password == 'admin';
       localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    return of(this.isUserLoggedIn).pipe(
       delay(1000),
       tap(val => {
          console.log("Is User Authentication is successful: " + val);
       })
    );
    }

    logout(): void {
    this.isUserLoggedIn = false;
       localStorage.removeItem('isUserLoggedIn');
    }
}






