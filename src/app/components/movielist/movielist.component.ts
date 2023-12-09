import { AfterViewInit, Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movielist.component.html'
})
export class MovielistComponent implements OnInit, AfterViewInit{

  public topratedMovies : Movie[] = [];
  public trendingList : Movie[] = [];
  public upcomingMovies : Movie[] = [];
  constructor(private movieService : MovieService,private route : ActivatedRoute,private router : Router 
    ,public loaderService: LoaderService,private titleService: Title) {
    this.movieService = movieService;
    this.loaderService = loaderService;
    this.route = route;
    this.router = router;
    this.titleService.setTitle('IMDb');
   
  }
  

 

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['token']){
      window.localStorage.setItem('token', this.route.snapshot.queryParams['token']);
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });

    }
    else{
    this.fetchData();
  }  
  }

  fetchData() {
    this.movieService.getTrendingMovies().subscribe((data : any) => {
      this.trendingList = data;
    });
    this.movieService.getTopRatedMovies().subscribe((data : any) => {
        this.topratedMovies = data;
    });
    this.movieService.getUpcomingMovies().subscribe((data : any) => {
      this.upcomingMovies = data;
    });
  }

  ngAfterViewInit() {
      //@ts-ignore
      new Glider(document.getElementById('glider1'), {
        draggable: true,
        skipTrack: true,
        arrows: {
            prev: '#one',
            next: '#two'
        }
    });      
      //@ts-ignore
    new Glider(document.getElementById('glider'), {
        draggable: true,
        skipTrack: true,
        arrows: {
            prev: '#three',
            next: '#four'
        }
    });
     //@ts-ignore
    new Glider(document.getElementById('glider2'), {
      draggable: true,
      skipTrack: true,
      arrows: {
          prev: '#five',
          next: '#six'
      }
  });
  }

  movieDetails(id : number, title : string){
    this.titleService.setTitle(title);
    this.router.navigate(['/movie/'+id]);
  }
        
        
        

  }

  
  


