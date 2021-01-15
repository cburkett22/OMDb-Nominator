import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async () => {
    const MOVIE_URL = "http://www.omdbapi.com/?s=star wars&apikey=ab616056";
    const response = await fetch(MOVIE_URL);
    const responseJSON = await response.json();

    console.log(responseJSON);

    setMovies(responseJSON.Search);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
    <div className="container-fluid app">
      <div className="row">
        <MovieList
          movies={movies}
        />
      </div>
    </div>
  );
};

export default App;