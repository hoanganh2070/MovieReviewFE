import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
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

  private avatarurl : BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentAvatarUrl : Observable<string> = this.avatarurl.asObservable();

  private isThereAvatar : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentIsThereAvatar : Observable<boolean> = this.isThereAvatar.asObservable();


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

  public uploadFile(file: File) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post('http://localhost:4000/api/cloudinary/upload', formData,{headers: headers});
  }




  public googleSignin(): void {
    window.open(this.googleAuthUrl, '_self');
  }

  public facebookSignin(): void {
    window.open(this.facebookAuthUrl, '_self');
  }

  public updateAvatarUrl(url: string) {
    this.avatarurl.next(url);
    this.isThereAvatar.next(true);
  }

  public logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('avatar');
    this.isThereAvatar.next(false);
  }
   
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

 
}
