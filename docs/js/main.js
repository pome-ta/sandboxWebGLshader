import { Fragmen } from './fragmen.js';

let wrapDiv, canvasDiv, cxtCanvas;

(() => {
  wrapDiv = document.createElement('div');
  canvasDiv = document.createElement('div');
  cxtCanvas = document.createElement('canvas');
  document.body
    .appendChild(wrapDiv)
    .appendChild(canvasDiv)
    .appendChild(cxtCanvas);

  wrapDiv.style.height = '100%';
  canvasDiv.style.overflow = 'hidden';
  canvasDiv.style.height = '100%';
  cxtCanvas.style.width = '100%';
  cxtCanvas.style.height = '100%';
  let { width, height } = wrapDiv.getBoundingClientRect();
  cxtCanvas.width = width;
  canvasDiv.height = height;
})();

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
  //target: canvasDiv,
  eventTarget: window,
});
const fragmen = new Fragmen(option);
//const fragmen = new Fragmen();
fragmen.mode = currentMode;
fragmen.render(currentSource);

//canvasDiv.addEventListener('touchmove', (event) => {
cxtCanvas.addEventListener('touchmove', (event) => {
  event.preventDefault();
  console.log(fragmen.mousePosition)
});
