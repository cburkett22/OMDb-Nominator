import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeader from './components/MovieListHeader';
import MovieSearch from './components/MovieSearch';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const MOVIE_URL = `http://www.omdbapi.com/?s=${searchValue}&apikey=ab616056`;
    const response = await fetch(MOVIE_URL);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className='container-fluid app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeader header='OMDb Movie Nominator' />
        <MovieSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
        />
      </div>
    </div>
  );
};

export default App;