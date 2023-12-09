import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit {

  imageUrls : string[] = []; 

  constructor(private movieService : MovieService, private route : ActivatedRoute) {
           this.movieService=movieService;
           this.route=route;
   }

   ngOnInit(): void {
       this.movieService.getMovieImages(this.route.snapshot.params['id']).subscribe(
        data =>{
          this.imageUrls = data;
        }
       );
   }

}
