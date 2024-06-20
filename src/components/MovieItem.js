import React from 'react';

const MovieItem = ({ movie }) => {
  const rating = Math.min(Math.max(movie.rating, 0), 10); // Ensure rating is between 0 and 10
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 10 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <li>
      <div>
        <h3>{movie.title}</h3>
        <div className="rating-stars">
          {[...Array(filledStars)].map((_, i) => (
            <span key={`filled-${i}`}>&#9733;</span>
          ))}
          {hasHalfStar && <span>&#9733;</span>}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`}>&#9734;</span>
          ))}
        </div>
        <p>{movie.category}</p>
      </div>
    </li>
  );
};

export default MovieItem;
