import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
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
  loading : boolean = true;
  trailer : SafeResourceUrl = '';
  color1 : number = 197;
  watchlist : boolean = false;
  loadingWatchlist : boolean = true;
  
  
  showRatingStar : boolean = false;
  formGroup = new FormGroup({
    rating: new FormControl(''),
  });


  constructor(movieService : MovieService, route : ActivatedRoute) {
    this.movieService = movieService;
    this.route = route;
   
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.movieService.getMovieDetails(id).subscribe(
        (data : any) => {
          this.movie = data;
        }
        );
        this.movieService.getMovieTrailer(params['id']).subscribe((data : any) => {
          this.trailer = data.url;
        });
       
    });
    this.loading = false;
     // @ts-ignore
     this.formGroup.get('rating').setValue(0);
    

    

  }

  ngAfterViewInit(): void {
    if(localStorage.getItem('token') != null)
     this.route.params.subscribe(params => {
      let id = params['id'];
      setTimeout(() => {
      this.movieService.checkMovieInWatchlist({Id : id}).subscribe({
        next: data => {
          console.log(data);
          this.loadingWatchlist = false;
          if(data['exist'] == true)
            this.watchlist = true;
          else
            this.watchlist = false;
        },
        error: error => {
          console.log(error);
        }
      })
      }, 500);
     })
    else 
      this.loadingWatchlist = false;
  }
  show(){
    if(this.showRatingStar == true)
      this.showRatingStar = false;
    else
       this.showRatingStar = true;
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
  




