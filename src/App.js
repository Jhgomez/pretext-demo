import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

let LINE_HEIGHT = 20;

let VID_G = 245,
VID_B = 200;

const BOOK_TEXT = `Earlier this week`

const canvas = document.getElementById("canvas");
const ctx = document.getElementById("2d");
const video = document.getElementById("video");

const videoCanvas = document.createElement("canvas");
const videoCtx = videoCanvas.getContext("2d", { willReadFrequently: true });

let cellW = 0,
  cols = 0,
  rows = 0;
let charGrid = [];
let videoPlaying = false;

function measureCellWidth() {
  // this line should say FONT but if using that value compilation fails
  // TODO so I may need to add a font to this project to be able to reference it here
  ctx.font = FontFace;
  cellW = ctx.measureText("M").width;
}

function layoutTextGrid() {
  cols = Math.floor(window.innerWidth / cellW);
  rows = Math.floor(window.innerHeight / LINE_HEIGHT);
  if (cols <= 0 || rows <= 0) return;

  // this line should say FONT but if using that value compilation fails
  // TODO so I may need to add a font to this project to be able to reference it here
  const prepared = prepareWithSegments(BOOK_TEXT, FontFace);
  charGrid = new Array(rows * cols).fill(" ");
  let cursor = { segmentIndex: 0, graphemeIndex: 0 };

  for (let row = 0; row < rows; row++) {
    let line = layoutNextLine(prepared, cursor, cols * cellW);
    if (line === null) {
      cursor = { segmentIndex: 0, graphemeIndex: 0 };
      line = layoutNextLine(prepared, cursor, cols * cellW);
      if (line === null) break;
    }
    for (let col = 0; col < cols && col < line.text.length; col++ ) {
      charGrid[row * cols + col] = line.text[col];
    }
    cursor = line.end;
  }

  videoCanvas.width = cols;
  videoCanvas.height = rows;
}

// 4:18
// function render() {
//   let vPix = null;
//   if(video.readyState >= 2) {
//     videoCtx
//   }
// }




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
