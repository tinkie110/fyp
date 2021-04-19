import React, { useState, useEffect } from 'react';
import './App.css';
import SimpleBottomNavigation from './component/nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import SimpleCard from './component/card';
import getSuggestion from './script/suggestion';
import getMovies from './script/movies';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Movie Recommendation App</p>
        <Router>
          <div className="content">
            <Switch>
              <Route path ='/movies'>
                <Movies />
              </Route>
              <Route path = '/suggestion'>
                <Suggestion />
              </Route>
            </Switch>
          </div>
          <SimpleBottomNavigation />
        </Router>
      </header>
    </div>
  );
}

function Movies() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');

  const [isLoading, setIsloading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieIds, setMovieIds] = useState([]);
  
  useEffect(() => {
    getMovies().then(result => {
      setMovies(result[0]);
      setMovieIds(result[1]);
      setIsloading(false);
    });
  }, []);

  return (
    <div className="flexContainer" style={{ alignItems: "center", padding: '0px' }}>
      { isLoading || !movies ? <h3 key={0}>{"Loading..."}</h3> : movies.map((s, i) => {
        return (
          <div className='flexItem' key={i}>
           <SimpleCard title={s} userId={userId} movieId={movieIds[i]} />
          </div>
        );
      })}
    </div>
  );
}

function Suggestion() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');

  const [isLoading, setIsloading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [movieIds, setMovieIds] = useState([]);
  
  useEffect(() => {
    getSuggestion(userId).then(result => {
      setSuggestions(result[0]);
      setMovieIds(result[1]);
      setIsloading(false);
    });
  }, [userId]);

  return (
    <div className="flexContainer" style={{ alignItems: "center", padding: '0px' }}>
      { isLoading || !suggestions ? <h3 key={0}>{"Loading..."}</h3> : suggestions.map((s, i) => {
        return (
          <div className='flexItem' key={i}>
           <SimpleCard title={s} userId={userId} movieId={movieIds[i]} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
