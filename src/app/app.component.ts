import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  title = 'Angular';

  

  ngOnInit(): void {
    if(window.localStorage.getItem('token') === null){
      const token = document.cookie.split(';')[0].split('=')[1];
      if(token !== undefined){
        window.localStorage.setItem('token',token);
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      }
    }
    if(window.localStorage.getItem('image') === null){
      const ck = document.cookie.split(';')[0].split('=')[1];
      let avatar = atob(decodeURIComponent(ck));
      console.log(avatar);
      if(avatar !== undefined){
        window.localStorage.setItem('avatar',avatar);
        document.cookie = "avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      }
    }
  }
}
