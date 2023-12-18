import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie.model';
import { WatchList } from '../model/watchlist.model';
import { Rate } from '../model/rate.model';

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

   addMovieToWatchlist(movie : WatchList) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.httpClient.post(this.baseUrl+'watchlist',movie, {headers: headers});
   }

   checkMovieInWatchlist(movie : any) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.httpClient.post(this.baseUrl+'watchlist/exist' ,movie, {headers: headers});
   }

   rateMovie(movie : Rate) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.httpClient.post(this.baseUrl+'rate' ,movie, {headers: headers});
   }

   getRate(movie : any) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.httpClient.post(this.baseUrl+'rate/get' ,movie, {headers: headers});
   }

   deleteMovieFromWatchlist(movie : any) : Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }),
      body: movie
    };
    return this.httpClient.delete(this.baseUrl+'watchlist/delete', options);
   }
}
