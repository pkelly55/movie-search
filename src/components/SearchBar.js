import React, { useState } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, selectedRatings, onRatingChange, selectedCategories, onCategoryChange, movieSuggestions }) => {
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(true);

  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
    setShowAutocomplete(true); // Show autocomplete suggestions when typing
  };

  const handleSelectSuggestion = (title) => {
    onSearchChange(title);
    setShowAutocomplete(false); // Hide autocomplete suggestions when selecting an item
  };

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value, 10);
    if (selectedRatings.includes(rating)) {
      onRatingChange(selectedRatings.filter(r => r !== rating));
    } else {
      onRatingChange([...selectedRatings, rating]);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleAnyRatingChange = (event) => {
    if (event.target.checked) {
      onRatingChange([]);
    }
  };

  const handleAnyGenreChange = (event) => {
    if (event.target.checked) {
      onCategoryChange([]);
    }
  };

  return (
    <div className="search-container">
      <div className="autocomplete">
        <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Enter movie name" />
        {searchTerm && showAutocomplete && (
          <ul className="autocomplete-list">
            {movieSuggestions.map((movie) => (
              <li key={movie.title} onClick={() => handleSelectSuggestion(movie.title)}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="filter-container">
        <div className="filter-dropdown">
          <button onClick={() => setShowRatingDropdown(!showRatingDropdown)}>Rating &#9662;</button>
          {showRatingDropdown && (
            <div className="dropdown-content">
              <label>
                <input type="checkbox" onChange={handleAnyRatingChange} /> Any Rating
              </label>
              {[...Array(10)].map((_, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    value={i + 1}
                    checked={selectedRatings.includes(i + 1)}
                    onChange={handleRatingChange}
                  />
                  {[...Array(i + 1)].map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="filter-dropdown">
          <button onClick={() => setShowGenreDropdown(!showGenreDropdown)}>Genre &#9662;</button>
          {showGenreDropdown && (
            <div className="dropdown-content">
              <label>
                <input type="checkbox" onChange={handleAnyGenreChange} /> Any Genre
              </label>
              <label><input type="checkbox" value="Action" checked={selectedCategories.includes('Action')} onChange={handleCategoryChange} /> Action</label>
              <label><input type="checkbox" value="Comedy" checked={selectedCategories.includes('Comedy')} onChange={handleCategoryChange} /> Comedy</label>
              <label><input type="checkbox" value="Thriller" checked={selectedCategories.includes('Thriller')} onChange={handleCategoryChange} /> Thriller</label>
              <label><input type="checkbox" value="Drama" checked={selectedCategories.includes('Drama')} onChange={handleCategoryChange} /> Drama</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
