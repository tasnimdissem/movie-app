import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBar {

  faMagnifyingGlass = faMagnifyingGlass;
  movieService = inject(MovieService);


  updateMovieList(title: string){
    this.movieService.getMovies().subscribe(
      Response=>this.movieService.movies=Response.filter
      (movie=>movie.title.toUpperCase().includes
      (title.toUpperCase())));
  }
}
