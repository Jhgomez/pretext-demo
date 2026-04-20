import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext';

let LINE_HEIGHT = 20;

let VID_R = 245,
VID_G = 245,
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
function render() {
  let vPix = null;
  if(video.readyState >= 2) {
    videoCtx.drawImage(video, 0, 0, cols, rows);
    vPix = videoCtx.getImageData(0, 0, cols, rows).data;
  }

  ctx.fillStyle = "#08080a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // this line should say FONT but if using that value compilation fails
  // TODO so I may need to add a font to this project to be able to reference it here
  ctx.font = FontFace;
  ctx.textBaseline = "top";

  for (let row = 0; row < rows; row++) {
    const y = row * LINE_HEIGHT;
    for (let col = 0; col < cols; col++) {
      const ch = charGrid[row * cols + col];
      if (ch === " ") continue;

      if (vPix) {
        const idx = (row * cols + col) * 4;
        const lum = 
          (0.299 * vPix[idx] + 0.587 * vPix[idx + 1] + 0.114 * vPix[idx + 2]) / 
          255;
        
        const THRESHOLD = 0.15;
        if (lum < THRESHOLD) continue;
        const t = (lum - THRESHOLD) / (1 - THRESHOLD);
        const alpha = Math.pow(t, 0.6);
        const r = Math.round(VID_R + (255 - VID_R) * t);
        const g = Math.round(VID_G + (255 - VID_G) * t);
        const b = Math.round(VID_B + (255 - VID_B) * t);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
      } else {
        ctx.fillStyle = "08080a";
      }

      ctx.fillText(ch, col * cellW, y);
    }
  }

  requestAnimationFrame(render);
}

function handleResize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  layoutTextGrid();
}

window.addEventListener("resize", handleResize);

document.addEventListener(
  "click",
  () => {
    video
      .play()
      .then(() => {
        videoPlaying = true;
      })
      .catch(() => {});
  }
)

function App() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked);
  }

  render()

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
