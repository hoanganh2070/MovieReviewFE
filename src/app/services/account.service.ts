import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Account} from "../model/account.model";
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public signedIn : Subject<boolean> = new Subject<boolean>();

  private httpClient : HttpClient;

  public baseUrl : string = 'http://localhost:4000/api/auth/';

  private googleAuthUrl : string = this.baseUrl + 'google/login';

  private facebookAuthUrl : string = this.baseUrl + 'facebook/redirect';


  public changeStatus(){
    this.signedIn.next(true);
    console.log("changed");
  }

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public signin(account : Account): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'signin', account);
  }

  public signup(user : User, account : Account): Observable<any> {
    return this.httpClient.post(this.baseUrl+'signup', {user, account});
  }
  

  public getUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.httpClient.get(this.baseUrl+'profile', {headers: headers});
  }


  public googleSignin(): void {
    window.open(this.googleAuthUrl, '_self');
  }

  public facebookSignin(): void {
    window.open(this.facebookAuthUrl, '_self');
  }
   
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

 
}