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
  }
}
