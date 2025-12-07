import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css'],
})
export class MovieList implements OnInit {

  movieService = inject(MovieService);
  movies: Movie[] = []
  router = inject(Router);
  route = inject(ActivatedRoute);
  movieid: number | string = '';

  ngOnInit(): void {
    this.movieid=this.route.snapshot.params['id'];
    this.movieService.getMovies().subscribe(
      (Response=>this.movieService.movies=Response))
  }

  navigateTo(id: number){
    this.router.navigate(['/movie', id]);
}

  addToWishlist(movie: Movie){
    const exists = this.movieService.wishlist.some(m => m.id === movie.id);
    if (!exists) {
      this.movieService.wishlist.push(movie);
    }
  }
}
