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



  constructor(private accountService : AccountService,private router : Router,private titleService : Title) { 
    this.router = router;
    if(window.localStorage.getItem('token')){
      this.signedIn = true;
    }
  }

  searchMovie(){
        this.router.navigateByUrl('/search/'+this.query);
  }

  ngOnInit(): void {
  }


  homepage(){
      this.titleService.setTitle('IMDb')
      this.router.navigate(['/']);
  }
     
}
