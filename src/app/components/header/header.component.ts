import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  public signedIn : boolean = false;

  public query : string;

  public avatar : boolean = false;
  
  public avatarurl : string;



  constructor(private accountService : AccountService,private router : Router,private titleService : Title) { 
    this.router = router;
    if(window.localStorage.getItem('token') !== null){
      this.signedIn = true;
    }
    if(window.localStorage.getItem('avatar') !== null){
      this.avatar = true;
      this.accountService.updateAvatarUrl(window.localStorage.getItem('avatar')!);
      this.accountService.currentAvatarUrl.subscribe(avatarurl => this.avatarurl = avatarurl);
    }
  }

  searchMovie(){
        this.router.navigateByUrl('/search/'+this.query);
  }

  ngOnInit(): void {
    if(window.localStorage.getItem('token') !== null){
      this.signedIn = true;
    }
  }


  homepage(){
      this.titleService.setTitle('IMDb')
      this.router.navigate(['/']);
  }
  profilePage(){
    if(this.router.url !== '/account/profile'){
      this.router.navigate(['account/profile']);
    }
  }
     
}
