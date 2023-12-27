import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {


  

  selectedFile: File | null = null;
  user : User;
  username : string;
  

   constructor(private accountService: AccountService,private router : Router) {
        this.accountService = accountService;
        this.router=router;
   }


  ngOnInit(): void {
      this.accountService.getUser().subscribe(
        data => {
           this.user = data['user'];
           this.username = data['username'];
           if(data['avatarurl'] !== null){
            const preview = document.getElementById('preview')! as HTMLImageElement;
            preview.src = data['avatarurl'];
           }
        })
  }
  async signOut(){
    return new Promise((resolve,reject) => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('avatar');
      resolve(true);
   }).then(() => {
      this.router.navigateByUrl('/');
   });
  }

  handleImage(event: any) {
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

      this.selectedFile = event.target.files[0];
    }

  }
  save(){
    if(this.selectedFile !== null)
    this.accountService.uploadFile(this.selectedFile).subscribe(data => {
      
        window.localStorage.setItem('avatar',data.avatar);
        window.location.reload();
  });
  }
}
