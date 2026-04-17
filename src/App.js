import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className={clicked ? 'clicked': ''} onClick={handleClick}>{clicked ? 'Clicked!':'Click me'}</button>
      </header>
    </div>
  );
}

export default App;
