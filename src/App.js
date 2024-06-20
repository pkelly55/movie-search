import React, { useState } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';

const moviesData = [
  { title: 'The Matrix', rating: 7.5, category: 'Action' },
  { title: 'Focus', rating: 6.9, category: 'Comedy' },
  { title: 'The Lazarus Effect', rating: 6.4, category: 'Thriller' },
  { title: 'Everly', rating: 5.0, category: 'Action' },
  { title: 'Maps to the Stars', rating: 7.5, category: 'Drama' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearchChange = (term) => setSearchTerm(term);
  const handleRatingChange = (ratings) => setSelectedRatings(ratings);
  const handleCategoryChange = (categories) => setSelectedCategories(categories);

  const filteredMovies = moviesData.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(movie.rating));
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(movie.category);
    return matchesSearch && matchesRating && matchesCategory;
  });

  const movieSuggestions = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedRatings={selectedRatings}
        onRatingChange={handleRatingChange}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        movieSuggestions={movieSuggestions}
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
