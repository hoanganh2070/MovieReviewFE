import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import { Router} from "@angular/router";
import {Account} from "../../model/account.model";
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent{

  formGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  failed : boolean = false;



 
  constructor(private accountService: AccountService,private router: Router, private titleService: Title) {
    this.accountService = accountService;
    this.router = router;
    this.titleService.setTitle('Sign In');

    }

  OnEnter(){
    this.SignIn();

    console.log("Enter");
  }

  SignIn(){
        // @ts-ignore
      const Username =  this.formGroup.get('username').value;
        // @ts-ignore
      const Password = this.formGroup.get('password').value;
        // @ts-ignore
      let account =  new Account(Username, Password);
        this.accountService.signin(account).subscribe({
          next: response => {
            if(response.authenticated){

              this.Success(response.accessToken,response.refreshToken,response.avatar).then(() => {
                const redirect = window.sessionStorage.getItem('redirect');
                this.router.navigateByUrl(redirect || "/")
                window.sessionStorage.removeItem('redirect');
              });

            }
            else{
              this.failed = true;
            }
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });

    }

    async Success(key : any,refreshToken : any,avatar: any){
      window.localStorage.setItem('token', key);
      window.localStorage.setItem('refreshtoken', refreshToken);
      if(avatar === null) return;
      window.localStorage.setItem('avatar', avatar);
    }

    googleSignIn(){
     this.accountService.googleSignin();
    }

    facebookSignIn(){
      this.accountService.facebookSignin();
    }


}
