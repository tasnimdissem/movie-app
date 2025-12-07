import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard implements OnInit {
  route=inject(ActivatedRoute)
  router=inject(Router)
  movieService=inject(MovieService)
  movieId:number=0
  movie:Movie|null=null
  buttonDisabled=false

  ngOnInit(): void {
    this.movieId=this.route.snapshot.params['id'];
    this.movieService.getMovieById(this.movieId).subscribe(response => {
      this.movie = response;
      if (this.movieService.wishlist.find(m => m.id === this.movie?.id)) {
        this.buttonDisabled = true;
      }
    });
  }

  navigateTo(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  addToWishlist(movie: Movie | null){
    if (!movie) return;
    const exists = this.movieService.wishlist.some(m => m.id === movie.id);
    if (!exists) {
      this.movieService.wishlist.push(movie);
    }
    this.buttonDisabled = true;
  }
}
