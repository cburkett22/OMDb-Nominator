import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeader from './components/MovieListHeader';
import MovieSearch from './components/MovieSearch';
import AddNominations from './components/AddNominations';
import RemoveNominations from './components/RemoveNominations';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
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
  
  useEffect(() => {
		const movieNominations = JSON.parse(
			localStorage.getItem('movie-nominations')
		);

		if (movieNominations) {
			setNominations(movieNominations);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('movie-nominations', JSON.stringify(items));
	};

  const addSelectedMovie = (movie) => {
    const newNominationList = [...nominations, movie];

    setNominations(newNominationList);
    saveToLocalStorage(newNominationList);
  };

  const removeSelectedMovie = (movie) => {
    const newNominationList = nominations.filter(
      (nominate) => nominate.imdbID !== movie.imdbID
    );

    setNominations(newNominationList);
    saveToLocalStorage(newNominationList);
  };

  return (
    <div className='container-fluid app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeader header='OMDb Movie Nominator' />
        <MovieSearch
          searchValue={ searchValue }
          setSearchValue={ setSearchValue }
        />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          nominateComponent={ AddNominations }
          handleNominateClick={ addSelectedMovie }
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeader header='Nominations' />
      </div>
      <div className='row'>
        <MovieList
          movies={nominations}
          nominateComponent={ RemoveNominations }
          handleNominateClick={ removeSelectedMovie }
        />
      </div>
    </div>
  );
};

export default App;