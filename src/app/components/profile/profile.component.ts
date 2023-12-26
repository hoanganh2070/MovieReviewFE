import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

   constructor(private accountService: AccountService,private router : Router) {
        this.accountService = accountService;
        this.router=router;
   }


  ngOnInit(): void {
      this.accountService.getUser().subscribe(
        data => {
          console.log(data);
        })
  }
  async signOut(){
    return new Promise((resolve,reject) => {
      window.localStorage.removeItem('token');
      resolve(true);
   }).then(() => {
      this.router.navigateByUrl('/');
   });
  }

  handleImage() {
    console.log("handleImage");
    const input = document.getElementById('imageInput')! as HTMLInputElement;
    const preview = document.getElementById('preview')! as HTMLImageElement;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          if (e.target && e.target.result) {
              preview.src = e.target.result.toString();
          }
      };

        reader.readAsDataURL(input.files[0]);
    }
}
}
