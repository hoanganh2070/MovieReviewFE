import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

   constructor(private accountService: AccountService) {
        this.accountService = accountService
   }


  ngOnInit(): void {
      this.accountService.getUser().subscribe(
        data => {
          console.log(data);
        })
  }
  signOut(){
    window.localStorage.removeItem('token');
    window.location.href = "/";
  }

}
