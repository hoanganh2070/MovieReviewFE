import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { Rate } from 'src/app/model/rate.model';
import { WatchList } from 'src/app/model/watchlist.model';
import { MovieService } from 'src/app/services/movie.service';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit, AfterViewInit{

  movie : Movie ;
  private movieService : MovieService;
  private route : ActivatedRoute;
  private router : Router;
  loading : boolean = true;
  trailer : SafeResourceUrl = '';
  color1 : number = 197;
  watchlist : boolean = false;
  loadingWatchlist : boolean = true;
  imageUrls : string[] = [];
  rate : string = 'Rate'; 
  
  
  showRatingStar : boolean = false;
  formGroup = new FormGroup({
    rating: new FormControl(''),
  });


  constructor(movieService : MovieService, route : ActivatedRoute,router : Router) {
    this.movieService = movieService;
    this.route = route;
    this.router = router;
   
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.movieService.getMovieDetails(id).subscribe(
        (data : any) => {
          this.movie = data['movie'];
          this.trailer = data['url'];
        }
        );
        this.movieService.getMovieImages(this.route.snapshot.params['id']).subscribe(
          data =>{
            this.imageUrls = data;
          }
         );
         
    });
    this.loading = false;
     // @ts-ignore
     this.formGroup.get('rating').setValue(0);
    
  }

  ngAfterViewInit(): void {
    if(localStorage.getItem('token') != null){
     this.rate = '';
     this.route.params.subscribe(params => {
      let id = params['id'];
      this.movieService.getRate({'movieId' : id}).subscribe((data : any) => {
        //@ts-ignore
         this.formGroup.get('rating').setValue(data['rate']);
       
      })
      setTimeout(() => {
      this.movieService.checkMovieInWatchlist({Id : id}).subscribe({
        next: data => {
          console.log(data);
          this.loadingWatchlist = false;
          if(data['exist'] == true)
            this.watchlist = true;
          else
            this.watchlist = false;
          //@ts-ignore
          this.rate = this.formGroup.get('rating')?.value;
          if(this.rate == '0')
            this.rate = 'Rate';
        },
        error: error => {
          console.log(error);
        }
      })
      }, 500);
     })}
    else 
      this.loadingWatchlist = false;
  }
  show(){
    if(localStorage.getItem('token') == null){
      this.router.navigateByUrl('account/signin');
      return;
    }
    if(this.showRatingStar == true)
      this.showRatingStar = false;
    else
       this.showRatingStar = true;
  }

  rateMovie(){
    setTimeout(() => {
      //@ts-ignore
      let rating :number = this.formGroup.get('rating')?.value;
      const rate = new Rate(this.movie.id, rating);
      this.rate = rating.toString();
      this.movieService.rateMovie(rate).subscribe();
    }, 300);
    

   
  }

  playTrailer(){
    //@ts-ignore
     document.getElementById('trailer').style.display = "block";
    //@ts-ignore
     document.getElementById('video')?.setAttribute('src', this.trailer);
     console.log("play trailer");
  }

  

  closeTrailer(){
    //@ts-ignore
    document.getElementById('trailer').style.display = "none";
    //@ts-ignore
    document.getElementById('video').setAttribute('src', '');
  }


  addWishList(){

   if(localStorage.getItem('token') == null){
     this.router.navigateByUrl('account/signin');
     return;
   }

   if(this.watchlist == true){
        console.log("delete from watchlist");
        this.movieService.deleteMovieFromWatchlist({Id : this.movie.id}).subscribe();
        
        this.watchlist = false;
        console.log(this.watchlist)
   }
   else{
    const moviedto = new WatchList(this.movie.id, this.movie.title, this.movie.poster_path);
    console.log(moviedto);
    this.movieService.addMovieToWatchlist(moviedto).subscribe({
      next: data => {
        console.log(data);
        console.log("added to watchlist");
      },
      error: error => {
        console.log(error);
      }
    })
    this.watchlist = true;
    };
    
   }

}
  




