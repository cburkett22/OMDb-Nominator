import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeader from './components/MovieListHeader';
import MovieSearch from './components/MovieSearch';
import AddNominations from './components/AddNominations';
import RemoveNominations from './components/RemoveNominations';
import Alert from 'react-bootstrap/Alert';
import ReactDOM, { render } from 'react-dom';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [show, setShow] = useState(true);

  const getMovieRequest = async (searchValue) => {
    const MOVIE_URL = `https://www.omdbapi.com/?s=${searchValue}&apikey=ab616056`;
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

  const renderAlert = (
    <Alert show={show} variant="success">
      <Alert.Heading>Nominations Complete!</Alert.Heading>
      <p>
      You have reached 5 nominations, thank you for participating! Come back later to see your saved nominees :)
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={() => window.location.reload()}>
          Close
        </button>
      </div>
    </Alert>
  );

	const saveToLocalStorage = (savedMovies) => {
    localStorage.setItem('movie-nominations', JSON.stringify(savedMovies));
    
    if (nominations.length === 4) {
      ReactDOM.render(renderAlert, document.getElementById('root'));
    }
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