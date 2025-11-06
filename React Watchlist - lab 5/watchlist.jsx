import React, { useState } from 'react';

 function Watchlist() {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception', review: 'Great movie!', rating: 5 },
    { id: 2, title: 'The Matrix', review: 'A classic sci-fi.', rating: 4 },
  ]);

  // state for the form inputs
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1); // Default rating is 1

  // to add a new movie 
  const handleSubmit = (e) => {
    //prevent refresh
    e.preventDefault();

    // Simple validation
    if (!title.trim()) {
      return;
    }

    // Create new movie object
    const newMovie = {
      id: Date.now(),
      title: title,
      review: review,
      rating: Number(rating),
    };

    // Add the new movie to the state
    setMovies((prevMovies) => [...prevMovies, newMovie]);

    // Reset the form fields after add
    setTitle('');
    setReview('');
    setRating(1);
  };

  // Remove Movie
  const handleRemoveMovie = (movieId) => {
    
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <div>
      <h1>My Movie Watchlist</h1>
      
      <form onSubmit={handleSubmit}>
        <h2>Add a New Movie</h2>
        <div>
          <label htmlFor="title">Movie Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="review">Your Review: </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="rating">Your Rating: </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <button type="submit">Add Movie</button>
      </form>



      <h2>My Movies</h2>
      <div>
        {movies.length === 0 ? (
          <p>No movies added yet. Add one above!</p>
        ) : (
        //display 
          movies.map((movie) => (
            <div key={movie.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <h3>{movie.title}</h3>
              
              
              <p>{'⭐'.repeat(movie.rating)}</p>
              
              
              <p>{movie.review}</p>

              
              <button onClick={() => handleRemoveMovie(movie.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Watchlist

