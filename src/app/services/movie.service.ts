import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private httpClient : HttpClient;

  private baseUrl : string = 'http://localhost:4000/api/movie/';

  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient;
   }

   getTopRatedMovies() : Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(this.baseUrl + 'toprated');
   }
  
   getTrendingMovies() : Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(this.baseUrl +'trending');
   }
   getMovieDetails(id : number) : Observable<Movie>{
    return this.httpClient.get<Movie>(this.baseUrl+id);
   }
   getMovieTrailer(id : number) : Observable<any>{
    return this.httpClient.get(this.baseUrl+id+'/video');
   }

   getMovieImages(id : number) : Observable<any>{
    return this.httpClient.get(this.baseUrl+id+'/images');
   }

   getUpcomingMovies() : Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(this.baseUrl+'upcoming');
   }

   searchMovies(query : string) : Observable<Movie[]>{
    query = query.replace(' ', '%20');
    return this.httpClient.get<Movie[]>(this.baseUrl+'search/'+query);
   }
}
