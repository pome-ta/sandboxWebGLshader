import { Fragmen } from './fragmen.js';

let canvasDiv, cxtCanvas;

function createCanvas() {
  //document.body.style.backgroundColor = 'dimgray';
  //document.body.style.backgroundColor = '#232323';
  canvasDiv = document.createElement('div');
  canvasDiv.style.overflow = 'hidden';
  cxtCanvas = document.createElement('canvas');
  canvasDiv.appendChild(cxtCanvas);
  document.body.appendChild(canvasDiv);
  // canvasDiv.style.width = '100%';
  canvasDiv.style.height = '100%';
  // cxtCanvas.style.width = '100%';
  cxtCanvas.style.width = '100%';
  cxtCanvas.style.height = '100%';
  //cxtCanvas.style.height = 'auto';
}

function initCanvasSize() {
  // const oneSide = Math.min(canvasDiv.clientWidth, canvasDiv.clientHeight);
  const oneSide = canvasDiv.clientWidth;
  cxtCanvas.width = oneSide;
  cxtCanvas.height = oneSide;
  //cxtCanvas.height = canvasDiv.clientWidth;
  //canvasW = cxtCanvas.width;
  //canvasH = cxtCanvas.height;
}

createCanvas();
// initCanvasSize();

let currentMode = Fragmen.MODE_CLASSIC; // 現在の Fragmen モード
let currentSource = ''; // 直近のソースコード

// fragmen.js 用のオプションの雛形
const FRAGMEN_OPTION = {
  target: null,
  eventTarget: null,
  mouse: true,
  resize: true,
  escape: false,
};

const fragmenDefaultSource = Fragmen.DEFAULT_SOURCE;
currentMode = Fragmen.MODE_CLASSIC;
currentSource = fragmenDefaultSource[currentMode];
// メインとなる fragmen のインスタンス
const option = Object.assign(FRAGMEN_OPTION, {
  target: cxtCanvas,
  eventTarget: window,
});
const fragmen = new Fragmen(option);
fragmen.mode = currentMode;
fragmen.render(currentSource);

cxtCanvas.addEventListener('touchmove', (event) => {
  event.preventDefault();
});

/*
window.addEventListener('DOMContentLoaded', () => {
  // cxtCanvas.width = `${canvasDiv.clientWidth}`;
  // cxtCanvas.height = `${canvasDiv.clientHeight}`;
  canvasDiv.style.width = '100%';
  canvasDiv.style.height = '100%';
//canvasDiv.style.height = `${document.documentElement.clientHeight}px`;
cxtCanvas.width = `${canvasDiv.clientWidth}px`;
cxtCanvas.height = `${canvasDiv.clientHeight}px`;
//cxtCanvas.style.width = `${canvasDiv.clientWidth}px`;
//cxtCanvas.style.height = `${canvasDiv.clientHeight}px`;
//fragmen.render(currentSource);
});
window.addEventListener('resize', () => {
  // cxtCanvas.width = `${canvasDiv.clientWidth}`;
  // cxtCanvas.height = `${canvasDiv.clientHeight}`;
});

*/
