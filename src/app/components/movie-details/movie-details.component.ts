import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie.service';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit,AfterViewInit{

  movie : Movie ;
  private movieService : MovieService;
  private route : ActivatedRoute;
  loading : boolean = false;
  trailer : SafeResourceUrl = '';
  color1 : number = 197;
  
  
  showRatingStar : boolean = false;
  formGroup = new FormGroup({
    rating: new FormControl(''),
  });


  constructor(movieService : MovieService, route : ActivatedRoute) {
    this.movieService = movieService;
    this.route = route;
   
  }
  ngAfterViewInit(): void {
    
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
     // @ts-ignore
     this.formGroup.get('rating').setValue(0);
   
  

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
  



}
