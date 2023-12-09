import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie.service';


@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html'
})
export class SearchlistComponent implements OnInit,AfterViewInit {
   
     public SearchList : Movie[] = [];

     constructor(private movieService : MovieService, private route : ActivatedRoute){
        this.movieService = movieService;
        this.route = route;
     }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let query = params['query'];
      this.movieService.searchMovies(query).subscribe((data : any) => {
        this.SearchList = data;
      });
    });
  }

  ngAfterViewInit(): void {
    //@ts-ignore
    new Glider(document.getElementById('glidersearch'), {
      draggable: true,
      skipTrack: true,
      arrows: {
          prev: '.seven',
          next: '.eight'
      }
  });  
  }

}
