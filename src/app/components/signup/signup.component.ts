import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {


  failed: boolean = false;

  formGroup : FormGroup = new FormGroup({
    user: new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    }),
    account : new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required)
    })
  });

  constructor(private accountService: AccountService,private router: Router, private titleService: Title) {
    this.accountService = accountService;
    this.router = router;
    this.titleService.setTitle('Sign Up');
  }


  SignUp() {
    let firstname = this.formGroup.get('user.firstname')?.value;
    let lastname = this.formGroup.get('user.lastname')?.value;
    let email = this.formGroup.get('user.email')?.value;
    let username = this.formGroup.get('account.username')?.value;
    let password = this.formGroup.get('account.password')?.value;
    let confirm = this.formGroup.get('account.confirm')?.value;

    if (password != confirm) {
      this.failed = true;
      console.log("passwords don't match");
    }
    else{
      // @ts-ignore : Object is possibly 'null'.
      let user = new User(firstname, lastname, email);
      // @ts-ignore : Object is possibly 'null'.
      let account = new Account(username, password);

      this.accountService.signup(user, account).subscribe(
        {next : response =>{
              console.log(response.message);
              this.router.navigateByUrl('/account/signin');
        }
      }
      );
    }
  }

}
