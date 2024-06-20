import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <MovieItem key={movie.title} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
