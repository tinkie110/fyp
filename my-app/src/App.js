import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SimpleBottomNavigation from './component/nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import SimpleCard from './component/card';
import getSuggestion from './script/suggestion';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path ='/movies'>
              <Movies />
            </Route>
            <Route path = '/suggestion'>
              <Suggestion userId={605} />
            </Route>
          </Switch>
          <SimpleBottomNavigation />
        </Router>
      </header>
    </div>
  );
}

function Movies() {
  return <h2>Movies</h2>;
}

function Suggestion({userId}) {
  const [sugg, setSugg] = useState([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    getSuggestion(userId).then((suggestions) => {
      console.log(suggestions);
      let formattedSuggestions = suggestions.map((s, i) => {
        return <SimpleCard title={s} key={i} />;
      });
      setSugg(formattedSuggestions);
    });
    return () => { mountedRef.current = false };
  }, [userId]);

  return (
    <ul style={{ alignItems: "center", padding: '0px' }}>{ sugg }</ul>
  );
}

export default App;
