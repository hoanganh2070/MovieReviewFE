import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { WatchList } from 'src/app/model/watchlist.model';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {


  

  selectedFile: File | null = null;
  user : User;
  username : string;
  watchlist : WatchList[];
  loading : boolean = true;
  avatar : string = '';
  

   constructor(private accountService: AccountService,private movieService : MovieService,private router : Router) {
        this.accountService = accountService;
        this.movieService = movieService;
        this.router=router;
   }


  ngOnInit(): void {
      this.accountService.getUser().subscribe(
        data => {
           this.user = data['user'];
           this.username = data['username'];
           if(data['avatarurl'] !== null){
             this.avatar = data['avatarurl'];
           }
           else{
              this.avatar = 'assets/images/blank.png';
           }
           this.loading = false;
        });
      this.movieService.getWatchlist().subscribe(data => {
        this.watchlist = data;
      });
  }
  async signOut(){
    return new Promise((resolve,reject) => {
      this.accountService.logout();
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
    {
    document.getElementById('save-btn')!.innerHTML = '<span  id="loader" class="loader"></span>';
    this.accountService.uploadFile(this.selectedFile).subscribe(data => {
        window.localStorage.setItem('avatar',data.avatar);
        this.accountService.updateAvatarUrl(data.avatar);
        const preview = document.getElementById('preview')! as HTMLImageElement;
        preview.src = data.avatar;
        document.getElementById('save-btn')!.innerHTML = 'Save';
     });
    }
  }
  
}
