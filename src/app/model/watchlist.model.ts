export class WatchList{
    constructor(private movieId : number,private movieName: string, private moviePoster : string){
        this.movieId = movieId;
        this.movieName = movieName;
        this.moviePoster = moviePoster;
    }
}