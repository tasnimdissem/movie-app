import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../interfaces/movie';
import { environment } from '../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class MovieService {

  private apiKey = environment.apikey;
  private http = inject(HttpClient);
  public movies: Movie[] = []
  public wishlist: Movie[] = []

  getMovies(): Observable<Movie[]> {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}`)
      .pipe(map((response: any) => (response.results as Movie[])))

  }
  getMovieById(id: number): Observable<Movie> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
      .pipe(map((response: any) => response));
  }
}