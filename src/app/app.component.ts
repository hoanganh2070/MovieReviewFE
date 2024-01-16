import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  title = 'Angular';

  

  ngOnInit(): void {
    try{
    if(window.localStorage.getItem('token') === null){
      const token = document.cookie.split(';')[0].split('=')[1];
      if(token !== undefined){
        window.localStorage.setItem('token',token);
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      }
    }
    else{
      return;
    }
    if(window.localStorage.getItem('refreshtoken') === null){
      const token = document.cookie.split(';')[0].split('=')[1];
      if(token !== undefined){
        window.localStorage.setItem('refreshtoken',token);
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      }
    }
    if(window.localStorage.getItem('avatar') === null){
      const ck = document.cookie.split(';')[0].split('=')[1];
      let avatar = atob(decodeURIComponent(ck));
      if(avatar !== undefined){
        window.localStorage.setItem('avatar',avatar);
        document.cookie = "avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      }
    }
  }
  catch(e){
   
  }
 
}
}
