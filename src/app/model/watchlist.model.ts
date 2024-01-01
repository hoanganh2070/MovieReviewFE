export class WatchList{
    constructor(public movieId : number,private movieName: string, public moviePoster : string){
        this.movieId = movieId;
        this.movieName = movieName;
        this.moviePoster = moviePoster;
    }
}