
export class Movie{
     id: number;
     title: string;
     original_title: string;
     overview: string;
     poster_path: string;
     release_date: string;
     vote_average: number;
     backdrop_path: number[];
     video : string;
  
  
    constructor(id: number, title: string, original_title: string, overview: string, 
      poster_path: string, release_date: string, vote_average: number,
       backdrop_path: number[], video : string) {
      this.id = id;
      this.title = title;
      this.original_title = original_title;
      this.overview = overview;
      this.poster_path = poster_path;
      this.release_date = release_date;
      this.vote_average = vote_average;
      this.backdrop_path = backdrop_path;
      this.video = video;
    }
  }